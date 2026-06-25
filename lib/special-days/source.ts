/**
 * Sumber data hari besar Indonesia. Seed otomatis dari API publik
 * (api-harilibur) per tahun, disuplemen hari marketing fixed-date + Cap Go Meh
 * (Imlek + 14 hari). Hasilnya digabung & dedup oleh store untuk di-CRUD.
 */

import type { SpecialCategory, SpecialDay } from "./types";

type ApiHoliday = {
  holiday_date?: string;
  holiday_name?: string;
  is_national_holiday?: boolean;
};

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "2026-3-1" → "2026-03-01" */
function normalizeDate(s: string): string {
  const [y, m, d] = s.split("-");
  if (!y || !m || !d) return s;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/** Tambah n hari ke "YYYY-MM-DD" → "YYYY-MM-DD". */
export function addDaysStr(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function categorize(name: string, national: boolean): SpecialCategory {
  const n = name.toLowerCase();
  if (
    /(idul|isra|mi.?raj|maulid|natal|nyepi|waisak|paskah|kenaikan|wafat|hijriah|imlek|tahun baru imlek)/.test(
      n,
    )
  )
    return "keagamaan";
  return national ? "nasional" : "nasional";
}

function mk(
  tanggal: string,
  nama: string,
  kategori: SpecialCategory,
  now: string,
): SpecialDay {
  const t = normalizeDate(tanggal);
  return {
    id: `${t}-${slug(nama)}`,
    tanggal: t,
    nama,
    kategori,
    aktif: true,
    sumber: "api",
    createdAt: now,
    updatedAt: now,
  };
}

async function fetchApiYear(year: number, now: string): Promise<SpecialDay[]> {
  const res = await fetch(`https://api-harilibur.vercel.app/api?year=${year}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API hari libur gagal (${res.status}).`);
  const data = (await res.json()) as ApiHoliday[];
  return data
    .filter((h): h is Required<ApiHoliday> => !!h.holiday_date && !!h.holiday_name)
    .map((h) =>
      mk(h.holiday_date, h.holiday_name, categorize(h.holiday_name, !!h.is_national_holiday), now),
    );
}

/** Hari marketing/festive fixed-date yang umumnya tak ada di API libur nasional. */
function curatedFor(year: number, now: string): SpecialDay[] {
  const items: [string, string, SpecialCategory][] = [
    [`${year}-02-14`, "Hari Valentine", "internasional"],
    [`${year}-04-21`, "Hari Kartini", "nasional"],
    [`${year}-09-04`, "Hari Pelanggan Nasional", "nasional"],
    [`${year}-10-02`, "Hari Batik Nasional", "nasional"],
    [`${year}-12-22`, "Hari Ibu", "nasional"],
  ];
  return items.map(([t, n, k]) => mk(t, n, k, now));
}

/** Cap Go Meh = 15 hari setelah Imlek (Imlek + 14). Hanya bila Imlek ditemukan. */
function deriveCapGoMeh(apiDays: SpecialDay[], now: string): SpecialDay[] {
  const imlek = apiDays.find((d) => /imlek/.test(d.nama.toLowerCase()));
  if (!imlek) return [];
  return [mk(addDaysStr(imlek.tanggal, 14), "Cap Go Meh", "keagamaan", now)];
}

/**
 * Kandidat hari besar untuk satu tahun (API + suplemen), sudah dedup per id.
 * apiOk=false bila API gagal (tetap kembalikan suplemen agar tak kosong).
 */
export async function getSourceDays(
  year: number,
): Promise<{ days: SpecialDay[]; apiOk: boolean }> {
  const now = new Date().toISOString();
  let api: SpecialDay[] = [];
  let apiOk = false;
  try {
    api = await fetchApiYear(year, now);
    apiOk = true;
  } catch {
    apiOk = false;
  }
  const all = [...api, ...deriveCapGoMeh(api, now), ...curatedFor(year, now)];
  const seen = new Set<string>();
  const days = all.filter((d) => (seen.has(d.id) ? false : (seen.add(d.id), true)));
  return { days, apiOk };
}
