/**
 * Seluruh teks Bahasa Indonesia untuk Tiska Open Table.
 *
 * CLAUDE.md mewajibkan copy hidup di lib/content.ts, bukan di JSX. File ini
 * memisahkan copy acara dari copy website (lib/content.ts sudah ~980 baris)
 * — aturan intinya tetap: nol string Indonesia di dalam komponen.
 */

import type { RichText } from "@/lib/content";

export const acara = {
  nama: "Tiska Open Table",
  eyebrow: "Undangan Khusus",
  tanggalPanjang: "Rabu, 7 Oktober 2026",
  jam: "18.00 – 21.00 WIB",
  deadlineTampil: "30 September 2026",
  dressCode: "Business / Smart Casual",
  judul: [
    { text: "Tiska " },
    { text: "Open Table", italic: true },
  ] satisfies RichText,
} as const;

/**
 * Naskah undangan WhatsApp. Placeholder: {nama}, {link}.
 * Sengaja ringkas — halamannya yang jadi undangan, pesan ini hanya bel pintu.
 */
export const naskahWa = `Yth. {nama},

Dengan hormat, Tiska Catering mengundang Anda pada *Tiska Open Table* — sesi cicip rasa dan temu kolega yang kami selenggarakan secara terbatas.

Rabu, 7 Oktober 2026 · 18.00 WIB
Plaza Mutiara, Lantai 9 — Mega Kuningan, Jakarta Selatan

Undangan lengkap beserta konfirmasi kehadiran dapat Anda buka di:
{link}

Kami akan berbahagia menyambut kehadiran Anda.

Hormat kami,
Tiska Catering — melayani sejak 1980`;

/** Naskah pengingat untuk tamu yang belum mengonfirmasi. */
export const naskahReminder = `Yth. {nama},

Menyambung undangan kami untuk *Tiska Open Table* pada Rabu, 7 Oktober 2026, kami ingin memastikan tempat duduk Anda tetap tersedia.

Konfirmasi kehadiran dapat dilakukan melalui tautan berikut:
{link}

Terima kasih atas perhatian Anda.

Hormat kami,
Tiska Catering`;

/** Naskah yang dipakai tamu saat mengajak rekannya sendiri. Placeholder: {nama}, {link}. */
export const naskahReferral = `Halo {nama},

Saya ingin mengajak Anda ke *Tiska Open Table* — sesi cicip rasa dan temu kolega dari Tiska Catering, Rabu 7 Oktober 2026 di Plaza Mutiara, Mega Kuningan.

Undangan dan konfirmasi kehadirannya di sini:
{link}

Semoga bisa bertemu di sana.`;

/** Label kolom & tombol di backoffice yang spesifik fitur ini. */
export const adminCopy = {
  imporJudul: "Impor daftar tamu",
  imporPetunjuk:
    "Tempel dari Excel atau Google Sheets. Satu tamu per baris, kolom dipisah titik koma: nama;jabatan;perusahaan;nomor WhatsApp;email. Baris header boleh disertakan, kolom kosong boleh dilewati. Nomor yang sudah terdaftar otomatis dilewati.",
  imporContoh:
    "nama;jabatan;perusahaan;hp;email\nBudi Santoso;Direktur Utama;PT Nusantara Jaya;08123456789;budi@nusantara.co.id",
} as const;
