"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import * as store from "./store";
import { getSourceDays } from "./source";
import { sendTestReminder } from "./reminder";
import { SPECIAL_CATEGORIES, type SpecialCategory } from "./types";

export type FormState = { ok?: boolean; error?: string; info?: string } | null;

function refresh() {
  revalidatePath("/admin/hari-spesial");
}

function parseKategori(v: FormDataEntryValue | null): SpecialCategory {
  const k = String(v ?? "custom") as SpecialCategory;
  return SPECIAL_CATEGORIES.includes(k) ? k : "custom";
}

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export async function addDayAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();
  const tanggal = String(formData.get("tanggal") ?? "").trim();
  const nama = String(formData.get("nama") ?? "").trim();
  if (!isDate(tanggal)) return { error: "Pilih tanggal yang valid." };
  if (!nama) return { error: "Nama hari wajib diisi." };
  await store.createDay({ tanggal, nama, kategori: parseKategori(formData.get("kategori")) });
  refresh();
  return { ok: true };
}

export async function updateDayAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  const tanggal = String(formData.get("tanggal") ?? "").trim();
  const nama = String(formData.get("nama") ?? "").trim();
  if (!id) return { error: "Data tidak ditemukan." };
  if (!isDate(tanggal)) return { error: "Pilih tanggal yang valid." };
  if (!nama) return { error: "Nama hari wajib diisi." };
  await store.updateDay(id, { tanggal, nama, kategori: parseKategori(formData.get("kategori")) });
  refresh();
  return { ok: true };
}

export async function toggleDayAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await store.toggleDay(id);
  refresh();
}

export async function deleteDayAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await store.deleteDay(id);
  refresh();
}

/** Tarik/segarkan hari besar dari sumber (tahun ini + tahun depan). */
export async function refreshSourceAction(): Promise<FormState> {
  await requireSession();
  const year = Number(store.todayJakarta().slice(0, 4));
  let added = 0;
  let apiFail = false;
  for (const y of [year, year + 1]) {
    const { days, apiOk } = await getSourceDays(y);
    if (!apiOk) apiFail = true;
    added += await store.mergeFromSource(days);
  }
  refresh();
  const base = added > 0 ? `${added} hari baru ditambahkan.` : "Sudah paling baru, tidak ada tambahan.";
  return { ok: true, info: apiFail ? `${base} (Sebagian sumber API gagal, memakai daftar bawaan.)` : base };
}

/** Kirim email uji untuk verifikasi setup Resend. */
export async function testReminderAction(): Promise<FormState> {
  await requireSession();
  const r = await sendTestReminder();
  return r.ok
    ? { ok: true, info: "Email uji terkirim — cek inbox penerima." }
    : { error: r.reason ?? "Gagal mengirim email uji." };
}
