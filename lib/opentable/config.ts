/**
 * Konstanta acara Tiska Open Table. Satu sumber kebenaran untuk tanggal,
 * kapasitas, venue, dan PIC — dipakai halaman publik, email, ICS, dan admin.
 *
 * CATATAN WAKTU (penting):
 * Semua waktu disimpan sebagai instant UTC, bukan string lokal. `new Date("2026-10-07 18:00")`
 * di-parse di zona waktu PENONTON — tamu dengan laptop GMT+8 akan melihat countdown
 * meleset sejam dan file kalender mendarat di jam yang salah. 18:00 WIB = 11:00 UTC.
 */

/** 7 Oktober 2026, 18.00 WIB */
export const ACARA_MULAI = new Date("2026-10-07T11:00:00Z");
/** 7 Oktober 2026, 21.00 WIB */
export const ACARA_SELESAI = new Date("2026-10-07T14:00:00Z");
/** Batas akhir konfirmasi kehadiran: 30 September 2026, 23.59 WIB */
export const RSVP_DEADLINE = new Date("2026-09-30T16:59:59Z");

/** Total kursi tersedia. Lewat dari ini, RSVP masuk daftar tunggu. */
export const KAPASITAS = Number(process.env.OPEN_TABLE_KAPASITAS) || 60;

/** Maksimal orang per RSVP (tamu + pendamping). Batas keras di skema DB: 5. */
export const MAKS_PAX = 2;

export const VENUE = {
  nama: "Plaza Mutiara, Lantai 9",
  alamat: "Jl. Lingkar Mega Kuningan Kav E1.2 No 1&2, Jakarta Selatan",
  mapsUrl: "https://maps.google.com/?q=Plaza+Mutiara+Jl.+Lingkar+Mega+Kuningan+Kav+E1.2+Jakarta+Selatan",
} as const;

/** PIC acara — semua tombol bantuan/ubah RSVP mengarah ke sini. */
export const PIC = {
  nama: "Ida Raodah",
  hp: "6281383108103",
  hpTampil: "0813-8310-8103",
} as const;

/**
 * Musik latar. Kosongkan untuk mematikan fitur sepenuhnya (toggle tidak dirender).
 * Isi dengan path berkas di /public setelah trek berlisensi tersedia.
 */
export const MUSIK_SRC = "";
export const MUSIK_VOLUME = 0.35;

/** Basis URL untuk membangun tautan undangan, tiket, dan QR. */
export const SITE_URL = "https://tiskacatering.com";

/** Path halaman undangan. Satu link untuk semua tamu. */
export const UNDANGAN_PATH = "/open-table";

/**
 * Bila true, form RSVP hanya dirender untuk pengunjung dengan ?k= yang valid.
 * Sakelar darurat kalau link bocor dan mulai kena spam — permukaan serangan jadi nol.
 */
export const WAJIB_KODE = false;

/** Alamat pengirim & tujuan notifikasi internal. */
export const EMAIL_FROM =
  process.env.OPEN_TABLE_FROM || "Tiska Open Table <undangan@tiskacatering.com>";
export const EMAIL_REPLY_TO = "mktg@tiskacatering.com";
export const EMAIL_NOTIFY_TO = process.env.OPEN_TABLE_NOTIFY_TO || "mktg@tiskacatering.com";

/** Tautan undangan personal untuk seorang tamu (nama + kode pelacak). */
export function tautanUndangan(nama?: string, kode?: string): string {
  const q = new URLSearchParams();
  if (nama) q.set("to", nama);
  if (kode) q.set("k", kode);
  const s = q.toString();
  return `${SITE_URL}${UNDANGAN_PATH}${s ? `?${s}` : ""}`;
}

/** Tautan e-tiket — ini juga isi payload QR. */
export function tautanTiket(kode: string): string {
  return `${SITE_URL}${UNDANGAN_PATH}/tiket/${kode}`;
}

/** Sudah lewat batas konfirmasi? */
export function rsvpDitutup(now: Date = new Date()): boolean {
  return now.getTime() > RSVP_DEADLINE.getTime();
}
