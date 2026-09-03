/**
 * Berkas kalender (.ics) + tautan Google Calendar untuk Tiska Open Table.
 *
 * Semua cap waktu ditulis dalam UTC (akhiran Z) supaya kalender tamu
 * menerjemahkannya sendiri ke zona waktu masing-masing. Menulis waktu lokal
 * tanpa zona akan mendarat di jam yang salah bagi tamu di luar WIB.
 */

import { ACARA_MULAI, ACARA_SELESAI, VENUE, SITE_URL, UNDANGAN_PATH } from "./config";

const JUDUL = "Tiska Open Table";
const LOKASI = `${VENUE.nama}, ${VENUE.alamat}`;
const KETERANGAN = `Sesi cicip rasa dan temu kolega bersama Tiska Catering.\\n\\nUndangan: ${SITE_URL}${UNDANGAN_PATH}`;

/** 2026-10-07T11:00:00Z → 20261007T110000Z */
function capUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Baris ICS wajib dipotong di 75 oktet, lanjutannya diawali satu spasi. */
function lipat(baris: string): string {
  if (baris.length <= 75) return baris;
  const potongan: string[] = [baris.slice(0, 75)];
  let sisa = baris.slice(75);
  while (sisa.length > 74) {
    potongan.push(" " + sisa.slice(0, 74));
    sisa = sisa.slice(74);
  }
  if (sisa) potongan.push(" " + sisa);
  return potongan.join("\r\n");
}

export function icsAcara(): string {
  const baris = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tiska Catering//Open Table//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:open-table-2026@tiskacatering.com`,
    `DTSTAMP:${capUtc(new Date())}`,
    `DTSTART:${capUtc(ACARA_MULAI)}`,
    `DTEND:${capUtc(ACARA_SELESAI)}`,
    `SUMMARY:${JUDUL}`,
    `LOCATION:${LOKASI}`,
    `DESCRIPTION:${KETERANGAN}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${JUDUL} besok`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return baris.map(lipat).join("\r\n") + "\r\n";
}

export function googleCalUrl(): string {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: JUDUL,
    dates: `${capUtc(ACARA_MULAI)}/${capUtc(ACARA_SELESAI)}`,
    location: LOKASI,
    details: KETERANGAN.replace(/\\n/g, "\n"),
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
