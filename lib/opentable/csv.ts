/**
 * Impor & ekspor CSV untuk daftar tamu Open Table.
 *
 * Impor sengaja lewat textarea paste, bukan file picker: daftarnya ~50 baris
 * dan dipakai sekali. Pemisah dideteksi otomatis (Excel Indonesia memakai ";"),
 * baris header dikenali secara longgar, tanda kutip dihormati.
 */

import type { GuestInput } from "./types";

/** Pecah satu baris CSV dengan menghormati "tanda kutip" dan "" sebagai escape. */
function pecahBaris(baris: string, pemisah: string): string[] {
  const out: string[] = [];
  let buf = "";
  let dalamKutip = false;
  for (let i = 0; i < baris.length; i++) {
    const c = baris[i];
    if (dalamKutip) {
      if (c === '"') {
        if (baris[i + 1] === '"') {
          buf += '"';
          i++;
        } else {
          dalamKutip = false;
        }
      } else {
        buf += c;
      }
    } else if (c === '"') {
      dalamKutip = true;
    } else if (c === pemisah) {
      out.push(buf.trim());
      buf = "";
    } else {
      buf += c;
    }
  }
  out.push(buf.trim());
  return out;
}

/** Tebak pemisah dari baris pertama: yang paling sering muncul menang. */
function tebakPemisah(baris: string): string {
  const kandidat = [";", "\t", ","];
  let terbaik = ";";
  let banyak = -1;
  for (const p of kandidat) {
    const jml = baris.split(p).length - 1;
    if (jml > banyak) {
      banyak = jml;
      terbaik = p;
    }
  }
  return banyak > 0 ? terbaik : ";";
}

const KOLOM: Record<keyof typeof URUTAN_BAWAAN, RegExp> = {
  nama: /^nama|name/i,
  jabatan: /jabatan|posisi|title|position/i,
  perusahaan: /perusahaan|kantor|company|instansi/i,
  hp: /hp|wa\b|whats|telp|telepon|nomor|no\b|phone/i,
  email: /e-?mail/i,
};

const URUTAN_BAWAAN = { nama: 0, jabatan: 1, perusahaan: 2, hp: 3, email: 4 };

export type HasilParse = {
  rows: GuestInput[];
  /** Baris yang dilewati karena kolom nama kosong. */
  dilewati: number;
};

/**
 * Ubah teks tempelan jadi daftar tamu.
 * Format yang diharapkan: nama;jabatan;perusahaan;hp;email — dengan atau
 * tanpa baris header. Kolom yang tidak ada boleh dikosongkan.
 */
export function parseGuestCsv(teks: string): HasilParse {
  const bersih = String(teks || "").replace(/^﻿/, "").trim();
  if (!bersih) return { rows: [], dilewati: 0 };

  const baris = bersih.split(/\r?\n/).filter((b) => b.trim());
  if (!baris.length) return { rows: [], dilewati: 0 };

  const pemisah = tebakPemisah(baris[0]);
  const pertama = pecahBaris(baris[0], pemisah);

  // Baris header bila minimal satu sel cocok pola kolom DAN tidak terlihat
  // seperti nomor telepon (daftar tanpa header sering diawali nama orang).
  const adaHeader =
    pertama.some((sel) => KOLOM.nama.test(sel)) &&
    pertama.some((sel) => KOLOM.hp.test(sel) || KOLOM.email.test(sel) || KOLOM.perusahaan.test(sel));

  let peta: Record<string, number> = { ...URUTAN_BAWAAN };
  if (adaHeader) {
    peta = {};
    for (const [kunci, pola] of Object.entries(KOLOM)) {
      const i = pertama.findIndex((sel) => pola.test(sel));
      if (i >= 0) peta[kunci] = i;
    }
    if (peta.nama === undefined) peta = { ...URUTAN_BAWAAN };
  }

  const isi = adaHeader ? baris.slice(1) : baris;
  const rows: GuestInput[] = [];
  let dilewati = 0;

  for (const b of isi) {
    const sel = pecahBaris(b, pemisah);
    const ambil = (k: string) => {
      const i = peta[k];
      return i === undefined ? "" : (sel[i] ?? "").trim();
    };
    const nama = ambil("nama").slice(0, 80);
    if (!nama) {
      dilewati++;
      continue;
    }
    rows.push({
      nama,
      jabatan: ambil("jabatan").slice(0, 100),
      perusahaan: ambil("perusahaan").slice(0, 100),
      hp: ambil("hp"),
      email: ambil("email").slice(0, 120),
    });
  }
  return { rows, dilewati };
}

/** Bungkus satu sel CSV: kutip ganda + escape, aman untuk Excel. */
function sel(v: unknown): string {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

/** Rakit CSV lengkap. BOM di depan supaya Excel membaca UTF-8 dengan benar. */
export function toCsv(header: string[], baris: (string | number)[][]): string {
  const isi = [header.map(sel).join(","), ...baris.map((b) => b.map(sel).join(","))].join("\r\n");
  return "﻿" + isi;
}
