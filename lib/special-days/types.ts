/**
 * Hari Spesial — kalender hari besar/festive (Lebaran, Natal, HUT RI, Imlek,
 * Cap Go Meh, dll). Di-seed dari API hari libur Indonesia per tahun, lalu
 * bisa di-CRUD penuh dari /admin/hari-spesial (edit tanggal, tambah hari
 * sendiri, nonaktifkan yang tak relevan). Dipakai untuk countdown, reminder,
 * dan pembuatan banner terjadwal.
 */

export type SpecialCategory =
  | "nasional"
  | "keagamaan"
  | "internasional"
  | "brand"
  | "custom";

export type SpecialDay = {
  id: string;
  /** "YYYY-MM-DD" */
  tanggal: string;
  nama: string;
  kategori: SpecialCategory;
  /** Relevan untuk Tiska — tampil di countdown & ikut diingatkan. */
  aktif: boolean;
  /** "api" = hasil seed otomatis; "manual" = ditambah/diedit Rama. */
  sumber: "api" | "manual";
  createdAt: string;
  updatedAt: string;
};

export type SpecialDayInput = {
  tanggal: string;
  nama: string;
  kategori: SpecialCategory;
  aktif?: boolean;
};

export const SPECIAL_CATEGORIES: SpecialCategory[] = [
  "nasional",
  "keagamaan",
  "internasional",
  "brand",
  "custom",
];

export const KATEGORI_LABEL: Record<SpecialCategory, string> = {
  nasional: "Nasional",
  keagamaan: "Keagamaan",
  internasional: "Internasional",
  brand: "Brand",
  custom: "Custom",
};

/** Warna aksen per kategori (mid-tone, terbaca di tema terang & gelap). */
export const KATEGORI_WARNA: Record<SpecialCategory, string> = {
  nasional: "#bf922f",
  keagamaan: "#7c6cc4",
  internasional: "#4f9a8f",
  brand: "#bd6f80",
  custom: "#8f8160",
};
