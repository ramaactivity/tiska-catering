"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import * as store from "./store";
import { parseGuestCsv } from "./csv";
import { normalHp } from "./kode";
import type { Kanal, ReferralStatus, RsvpStatus } from "./types";

export type FormState = { ok?: boolean; error?: string; info?: string } | null;

const ADMIN_PATH = "/admin/open-table";

function segarkan(): void {
  revalidatePath(ADMIN_PATH);
  revalidatePath(`${ADMIN_PATH}/rsvp`);
  revalidatePath(`${ADMIN_PATH}/referral`);
  revalidatePath(`${ADMIN_PATH}/checkin`);
}

// ─── Tamu undangan ────────────────────────────────────────────────────────────

export async function importGuestsAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();

  const teks = String(formData.get("teks") ?? "");
  if (!teks.trim()) return { error: "Tempel dulu daftar tamunya." };

  const { rows, dilewati } = parseGuestCsv(teks);
  if (!rows.length) {
    return { error: "Tidak ada baris yang bisa dibaca. Pastikan kolom pertama berisi nama." };
  }
  if (rows.length > 500) return { error: "Maksimal 500 tamu sekali impor." };

  try {
    const { added, skipped } = await store.createGuests(rows);
    segarkan();
    const catatan = [
      `${added} tamu ditambahkan`,
      skipped ? `${skipped} dilewati karena nomornya sudah terdaftar` : "",
      dilewati ? `${dilewati} baris dilewati karena namanya kosong` : "",
    ].filter(Boolean);
    return { ok: true, info: catatan.join(" · ") + "." };
  } catch {
    return { error: "Gagal menyimpan. Coba lagi." };
  }
}

export async function updateGuestAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  const nama = String(formData.get("nama") ?? "").trim();
  if (!id) return { error: "Tamu tidak ditemukan." };
  if (!nama) return { error: "Nama wajib diisi." };

  try {
    await store.updateGuest(id, {
      nama: nama.slice(0, 80),
      jabatan: String(formData.get("jabatan") ?? "").trim().slice(0, 100),
      perusahaan: String(formData.get("perusahaan") ?? "").trim().slice(0, 100),
      hp: String(formData.get("hp") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim().slice(0, 120),
    });
    segarkan();
    return { ok: true, info: "Tersimpan." };
  } catch {
    return { error: "Gagal menyimpan. Coba lagi." };
  }
}

export async function deleteGuestAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await store.deleteGuest(id);
  segarkan();
}

/** Dipanggil dari tombol "Kirim WA" — pengiriman sendiri terjadi di aplikasi WhatsApp. */
export async function markGuestSentAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  const channel = String(formData.get("channel") ?? "wa") as Kanal;
  if (!id) return;
  await store.markGuestSent(id, channel === "email" ? "email" : "wa");
  segarkan();
}

// ─── RSVP (admin) ─────────────────────────────────────────────────────────────

const RSVP_STATUS: readonly RsvpStatus[] = ["confirmed", "waitlist", "declined", "cancelled"];

export async function setRsvpStatusAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "") as RsvpStatus;
  if (!id || !RSVP_STATUS.includes(status)) return;
  await store.setRsvpStatus(id, status);
  segarkan();
}

export async function deleteRsvpAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await store.deleteRsvp(id);
  segarkan();
}

// ─── Check-in ─────────────────────────────────────────────────────────────────

export async function checkinAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();
  const kode = String(formData.get("kode") ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 12);
  if (!kode) return { error: "Kode tiket kosong." };

  const hasil = await store.checkin(kode);
  if (!hasil.ok) return { error: "Kode tiket tidak dikenal." };
  segarkan();
  const nama = hasil.rsvp.nama;
  return hasil.sudah
    ? { ok: true, info: `${nama} sudah check-in sebelumnya.` }
    : { ok: true, info: `${nama} berhasil check-in.` };
}

export async function undoCheckinAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await store.undoCheckin(id);
  segarkan();
}

// ─── Referral (admin) ─────────────────────────────────────────────────────────

const REFERRAL_STATUS: readonly ReferralStatus[] = ["baru", "diproses", "diundang", "ditolak"];

export async function setReferralStatusAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "") as ReferralStatus;
  if (!id || !REFERRAL_STATUS.includes(status)) return;
  await store.setReferralStatus(id, status);
  segarkan();
}

export async function deleteReferralAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await store.deleteReferral(id);
  segarkan();
}

/** Pindahkan seorang rekomendasi ke daftar undangan resmi. */
export async function referralKeUndanganAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const ref = (await store.getReferrals()).find((r) => r.id === id);
  if (!ref) return;

  const kontak = ref.kontak.trim();
  const hp = normalHp(kontak);
  await store.createGuests([
    {
      nama: ref.nama,
      jabatan: ref.jabatan,
      perusahaan: ref.perusahaan,
      hp,
      email: hp ? "" : kontak.includes("@") ? kontak : "",
      referredBy: ref.referrerKode,
      catatan: ref.referrerNama ? `Rekomendasi dari ${ref.referrerNama}` : "",
    },
  ]);
  await store.setReferralStatus(id, "diundang");
  segarkan();
}
