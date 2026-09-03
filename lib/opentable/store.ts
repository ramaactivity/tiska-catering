/**
 * Satu-satunya file yang bicara ke database Open Table.
 * Semua query & RPC ada di sini; actions.ts dan halaman tidak pernah impor db.ts.
 */

import "server-only";
import { sb, openTableEnabled, UNIQUE_VIOLATION } from "./db";
import { kodeBaru, normalHp } from "./kode";
import { KAPASITAS } from "./config";
import type {
  CheckinResult,
  Guest,
  GuestInput,
  Kanal,
  Referral,
  ReferralInput,
  ReferralStatus,
  Rsvp,
  RsvpInput,
  RsvpStatus,
  Stats,
} from "./types";

export { openTableEnabled };

const T_GUEST = "open_table_guest";
const T_RSVP = "open_table_rsvp";
const T_REFERRAL = "open_table_referral";

// ─── Pemetaan baris DB (snake_case) → tipe aplikasi (camelCase) ───────────────

type Row = Record<string, unknown>;
const s = (v: unknown): string => (typeof v === "string" ? v : "");
const sn = (v: unknown): string | null => (typeof v === "string" ? v : null);
const n = (v: unknown): number => (typeof v === "number" ? v : Number(v) || 0);
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);

function toGuest(r: Row): Guest {
  return {
    id: s(r.id),
    kode: s(r.kode),
    nama: s(r.nama),
    jabatan: s(r.jabatan),
    perusahaan: s(r.perusahaan),
    hp: s(r.hp),
    email: s(r.email),
    status: s(r.status) as Guest["status"],
    sentAt: sn(r.sent_at),
    sentChannel: sn(r.sent_channel) as Kanal | null,
    openedAt: sn(r.opened_at),
    openCount: n(r.open_count),
    referredBy: sn(r.referred_by),
    catatan: s(r.catatan),
    createdAt: s(r.created_at),
    updatedAt: s(r.updated_at),
  };
}

function toRsvp(r: Row): Rsvp {
  return {
    id: s(r.id),
    kode: s(r.kode),
    guestKode: sn(r.guest_kode),
    hadir: r.hadir === true,
    pax: n(r.pax),
    nama: s(r.nama),
    jabatan: s(r.jabatan),
    perusahaan: s(r.perusahaan),
    email: s(r.email),
    hp: s(r.hp),
    preferensi: arr(r.preferensi),
    pendamping: arr(r.pendamping),
    alergi: s(r.alergi),
    catatan: s(r.catatan),
    status: s(r.status) as RsvpStatus,
    checkedInAt: sn(r.checked_in_at),
    checkedInPax: typeof r.checked_in_pax === "number" ? r.checked_in_pax : null,
    createdAt: s(r.created_at),
    updatedAt: s(r.updated_at),
  };
}

function toReferral(r: Row): Referral {
  return {
    id: s(r.id),
    referrerKode: sn(r.referrer_kode),
    referrerNama: s(r.referrer_nama),
    nama: s(r.nama),
    jabatan: s(r.jabatan),
    perusahaan: s(r.perusahaan),
    kontak: s(r.kontak),
    channel: s(r.channel) as Referral["channel"],
    status: s(r.status) as ReferralStatus,
    catatan: s(r.catatan),
    createdAt: s(r.created_at),
  };
}

// ─── Statistik ────────────────────────────────────────────────────────────────

const STATS_KOSONG: Stats = {
  jmlHadir: 0,
  totalPax: 0,
  jmlWaitlist: 0,
  jmlTidakHadir: 0,
  jmlCheckin: 0,
  sisaKursi: KAPASITAS,
};

export async function getStats(): Promise<Stats> {
  if (!openTableEnabled()) return STATS_KOSONG;
  const { data, error } = await sb().from("open_table_stats").select("*").single();
  if (error || !data) return STATS_KOSONG;
  const r = data as Row;
  const totalPax = n(r.total_pax);
  return {
    jmlHadir: n(r.jml_hadir),
    totalPax,
    jmlWaitlist: n(r.jml_waitlist),
    jmlTidakHadir: n(r.jml_tidak_hadir),
    jmlCheckin: n(r.jml_checkin),
    sisaKursi: Math.max(0, KAPASITAS - totalPax),
  };
}

// ─── Tamu undangan ────────────────────────────────────────────────────────────

export async function getGuests(): Promise<Guest[]> {
  if (!openTableEnabled()) return [];
  const { data, error } = await sb()
    .from(T_GUEST)
    .select("*")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return (data as Row[]).map(toGuest);
}

export async function getGuestByKode(kode: string): Promise<Guest | null> {
  if (!openTableEnabled() || !kode) return null;
  const { data, error } = await sb().from(T_GUEST).select("*").eq("kode", kode).maybeSingle();
  if (error || !data) return null;
  return toGuest(data as Row);
}

/**
 * Tambah tamu massal. Nomor HP dinormalisasi lalu dipakai untuk dedupe
 * (lawan tamu yang sudah ada maupun duplikat di dalam satu batch).
 * Kode unik: coba tulis, ulangi bila DB menolak karena tabrakan — bukan
 * SELECT-dulu, karena itu justru balapan yang kita hindari.
 */
export async function createGuests(
  rows: GuestInput[],
): Promise<{ added: number; skipped: number }> {
  if (!openTableEnabled() || !rows.length) return { added: 0, skipped: 0 };

  const existing = await getGuests();
  const dipakai = new Set(existing.map((g) => g.hp).filter(Boolean));
  let added = 0;
  let skipped = 0;

  for (const row of rows) {
    const hp = normalHp(row.hp ?? "");
    if (hp && dipakai.has(hp)) {
      skipped++;
      continue;
    }
    let tersimpan = false;
    for (let coba = 0; coba < 5 && !tersimpan; coba++) {
      const { error } = await sb().from(T_GUEST).insert({
        kode: kodeBaru(),
        nama: row.nama,
        jabatan: row.jabatan ?? "",
        perusahaan: row.perusahaan ?? "",
        hp,
        email: row.email ?? "",
        catatan: row.catatan ?? "",
        referred_by: row.referredBy ?? null,
      });
      if (!error) {
        tersimpan = true;
      } else if (error.code !== UNIQUE_VIOLATION) {
        throw error;
      }
    }
    if (tersimpan) {
      added++;
      if (hp) dipakai.add(hp);
    } else {
      skipped++;
    }
  }
  return { added, skipped };
}

export async function updateGuest(id: string, patch: Partial<GuestInput>): Promise<void> {
  if (!openTableEnabled()) return;
  const set: Row = { updated_at: new Date().toISOString() };
  if (patch.nama !== undefined) set.nama = patch.nama;
  if (patch.jabatan !== undefined) set.jabatan = patch.jabatan;
  if (patch.perusahaan !== undefined) set.perusahaan = patch.perusahaan;
  if (patch.hp !== undefined) set.hp = normalHp(patch.hp);
  if (patch.email !== undefined) set.email = patch.email;
  if (patch.catatan !== undefined) set.catatan = patch.catatan;
  const { error } = await sb().from(T_GUEST).update(set).eq("id", id);
  if (error) throw error;
}

export async function deleteGuest(id: string): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb().from(T_GUEST).delete().eq("id", id);
  if (error) throw error;
}

/** Tandai undangan sudah dikirim. Status 'rsvp' tidak pernah diturunkan. */
export async function markGuestSent(id: string, channel: Kanal): Promise<void> {
  if (!openTableEnabled()) return;
  const { data } = await sb().from(T_GUEST).select("status").eq("id", id).maybeSingle();
  const status = s((data as Row | null)?.status);
  const { error } = await sb()
    .from(T_GUEST)
    .update({
      sent_at: new Date().toISOString(),
      sent_channel: channel,
      status: status === "rsvp" || status === "dibuka" ? status : "terkirim",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

/** Catat sampul undangan dibuka. opened_at hanya diisi sekali (pembukaan pertama). */
export async function trackOpen(kode: string): Promise<void> {
  if (!openTableEnabled() || !kode) return;
  const guest = await getGuestByKode(kode);
  if (!guest) return;
  await sb()
    .from(T_GUEST)
    .update({
      opened_at: guest.openedAt ?? new Date().toISOString(),
      open_count: guest.openCount + 1,
      status: guest.status === "rsvp" ? "rsvp" : "dibuka",
      updated_at: new Date().toISOString(),
    })
    .eq("id", guest.id);
}

// ─── RSVP ─────────────────────────────────────────────────────────────────────

/**
 * Kirim RSVP lewat RPC open_table_submit_rsvp — hitungan kursi diserialkan
 * dengan advisory lock di dalam Postgres, jadi kapasitas mustahil kelewat
 * meski beberapa tamu menekan Kirim di detik yang sama.
 */
export async function submitRsvp(input: RsvpInput): Promise<Rsvp> {
  if (!openTableEnabled()) throw new Error("Database Open Table belum aktif.");

  let terakhir: unknown = null;
  for (let coba = 0; coba < 5; coba++) {
    const { data, error } = await sb().rpc("open_table_submit_rsvp", {
      p_kode: kodeBaru(),
      p_guest_kode: input.guestKode ?? null,
      p_hadir: input.hadir,
      p_pax: input.pax,
      p_nama: input.nama,
      p_jabatan: input.jabatan ?? "",
      p_perusahaan: input.perusahaan ?? "",
      p_email: input.email ?? "",
      p_hp: input.hp,
      p_preferensi: input.preferensi ?? [],
      p_pendamping: input.pendamping ?? [],
      p_alergi: input.alergi ?? "",
      p_catatan: input.catatan ?? "",
      p_kapasitas: KAPASITAS,
    });
    if (!error && data) return toRsvp(data as Row);
    terakhir = error;
    if (error?.code !== UNIQUE_VIOLATION) break;
  }
  throw terakhir instanceof Error ? terakhir : new Error("Gagal menyimpan RSVP.");
}

export async function getRsvps(status?: RsvpStatus): Promise<Rsvp[]> {
  if (!openTableEnabled()) return [];
  let q = sb().from(T_RSVP).select("*").order("created_at", { ascending: false });
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error || !data) return [];
  return (data as Row[]).map(toRsvp);
}

export async function getRsvpByKode(kode: string): Promise<Rsvp | null> {
  if (!openTableEnabled() || !kode) return null;
  const { data, error } = await sb().from(T_RSVP).select("*").eq("kode", kode).maybeSingle();
  if (error || !data) return null;
  return toRsvp(data as Row);
}

export async function getRsvpByGuestKode(guestKode: string): Promise<Rsvp | null> {
  if (!openTableEnabled() || !guestKode) return null;
  const { data, error } = await sb()
    .from(T_RSVP)
    .select("*")
    .eq("guest_kode", guestKode)
    .maybeSingle();
  if (error || !data) return null;
  return toRsvp(data as Row);
}

/** Override manual admin — satu-satunya jalan menembus kapasitas. */
export async function setRsvpStatus(id: string, status: RsvpStatus): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb()
    .from(T_RSVP)
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteRsvp(id: string): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb().from(T_RSVP).delete().eq("id", id);
  if (error) throw error;
}

/** Check-in idempoten: scan kedua mengembalikan sudah=true, tidak menimpa jam masuk. */
export async function checkin(kode: string): Promise<CheckinResult> {
  if (!openTableEnabled()) return { ok: false, reason: "notfound" };
  const { data, error } = await sb().rpc("open_table_checkin", { p_kode: kode });
  if (error || !data) return { ok: false, reason: "notfound" };
  const r = data as Row;
  if (r.ok !== true) return { ok: false, reason: "notfound" };
  return { ok: true, sudah: r.sudah === true, rsvp: toRsvp(r.rsvp as Row) };
}

export async function undoCheckin(id: string): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb()
    .from(T_RSVP)
    .update({ checked_in_at: null, checked_in_pax: null, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

// ─── Referral ─────────────────────────────────────────────────────────────────

export async function createReferral(input: ReferralInput): Promise<Referral> {
  if (!openTableEnabled()) throw new Error("Database Open Table belum aktif.");
  const { data, error } = await sb()
    .from(T_REFERRAL)
    .insert({
      referrer_kode: input.referrerKode ?? null,
      referrer_nama: input.referrerNama ?? "",
      nama: input.nama,
      jabatan: input.jabatan ?? "",
      perusahaan: input.perusahaan ?? "",
      kontak: input.kontak,
      channel: input.channel,
    })
    .select("*")
    .single();
  if (error || !data) throw error ?? new Error("Gagal menyimpan rekomendasi.");
  return toReferral(data as Row);
}

export async function getReferrals(): Promise<Referral[]> {
  if (!openTableEnabled()) return [];
  const { data, error } = await sb()
    .from(T_REFERRAL)
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as Row[]).map(toReferral);
}

export async function setReferralStatus(id: string, status: ReferralStatus): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb().from(T_REFERRAL).update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteReferral(id: string): Promise<void> {
  if (!openTableEnabled()) return;
  const { error } = await sb().from(T_REFERRAL).delete().eq("id", id);
  if (error) throw error;
}
