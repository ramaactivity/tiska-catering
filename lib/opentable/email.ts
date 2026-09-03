/**
 * Tiga email Open Table: undangan, konfirmasi RSVP, dan notifikasi referral.
 *
 * Bahasa visualnya sengaja meniru lib/special-days/reminder.ts — tabel,
 * inline style, lebar 520px, bar ink + eyebrow emas. Template itu sudah
 * terbukti render benar di Gmail dan Outlook; tidak perlu sistem kedua.
 *
 * PRASYARAT: domain tiskacatering.com harus terverifikasi di Resend sebelum
 * email ke alamat selain pemilik akun bisa terkirim.
 */

import "server-only";
import { sendEmail } from "@/lib/email";
import {
  EMAIL_FROM,
  EMAIL_NOTIFY_TO,
  EMAIL_REPLY_TO,
  PIC,
  SITE_URL,
  VENUE,
  tautanTiket,
  tautanUndangan,
} from "./config";
import { acara, penutup } from "./content";
import { googleCalUrl } from "./calendar";
import { tampilHp, waLink } from "./kode";
import type { Guest, Referral, Rsvp } from "./types";

const esc = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function bingkai(eyebrow: string, isi: string): string {
  return `<!doctype html><html><body style="margin:0;background:#efe7d6;padding:28px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2a2418">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="100%" style="max-width:520px;background:#f6f1e7;border-radius:18px;overflow:hidden;border:1px solid #e3d9c3">
      <tr><td style="background:#0e0d0a;padding:20px 28px">
        <span style="color:#d8b876;font-size:12px;letter-spacing:.22em;text-transform:uppercase">${esc(eyebrow)}</span>
      </td></tr>
      <tr><td style="padding:28px">${isi}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:11px;color:#9b9486">Tiska Catering · ${esc(penutup.sejak)}</p>
  </td></tr></table>
</body></html>`;
}

function tombol(href: string, label: string): string {
  return `<a href="${esc(href)}" style="display:inline-block;background:#b8954e;color:#201706;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:12px">${esc(label)}</a>`;
}

function barisDetail(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;font-size:14px;color:#4a4537;line-height:1.7">
    <tr><td style="padding:2px 14px 2px 0;color:#a07c34;white-space:nowrap">Waktu</td><td>${esc(acara.tanggalPanjang)} · ${esc(acara.jam)}</td></tr>
    <tr><td style="padding:2px 14px 2px 0;color:#a07c34;white-space:nowrap">Tempat</td><td>${esc(VENUE.nama)}<br>${esc(VENUE.alamat)}</td></tr>
    <tr><td style="padding:2px 14px 2px 0;color:#a07c34;white-space:nowrap">Busana</td><td>${esc(acara.dressCode)}</td></tr>
  </table>`;
}

// ─── 1) Undangan ──────────────────────────────────────────────────────────────

/**
 * Sengaja ringkas: halamannya yang jadi undangan, email ini hanya bel pintu.
 */
export async function kirimEmailUndangan(guest: Guest): Promise<boolean> {
  if (!guest.email) return false;
  const tautan = tautanUndangan(guest.nama, guest.kode);
  const sapaan = [guest.jabatan, guest.perusahaan].filter(Boolean).join(", ");

  const isi = `
    <p style="margin:0 0 6px;font-size:13px;color:#a07c34">Kepada Yth.</p>
    <h1 style="margin:0 0 4px;font-size:24px;font-weight:400;color:#2a2418">${esc(guest.nama)}</h1>
    ${sapaan ? `<p style="margin:0 0 20px;font-size:13px;color:#6b6557">${esc(sapaan)}</p>` : ""}
    <p style="margin:0 0 22px;font-size:14px;line-height:1.75;color:#4a4537">
      Dengan hormat, Tiska Catering mengundang Anda pada <strong>${esc(acara.nama)}</strong> —
      sesi cicip rasa dan temu kolega yang kami selenggarakan secara terbatas.
    </p>
    ${barisDetail()}
    ${tombol(tautan, "Buka undangan")}
    <p style="margin:22px 0 0;font-size:12px;line-height:1.7;color:#9b9486">
      Mohon konfirmasi kehadiran paling lambat ${esc(acara.deadlineTampil)}.<br>
      Pertanyaan seputar acara: ${esc(PIC.nama)} · ${esc(tampilHp(PIC.hp))}
    </p>`;

  return sendEmail({
    to: guest.email,
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    subject: `Undangan ${acara.nama} — ${acara.tanggalPanjang}`,
    html: bingkai("Undangan Khusus", isi),
  });
}

// ─── 2) Konfirmasi RSVP ───────────────────────────────────────────────────────

/**
 * Copy untuk confirmed dan waitlist sengaja dipisah, bukan satu template
 * dengan variabel — dua situasi ini memerlukan nada yang berbeda.
 */
export async function kirimEmailKonfirmasi(rsvp: Rsvp): Promise<boolean> {
  if (!rsvp.email) return false;
  const ubah = waLink(
    PIC.hp,
    `Halo ${PIC.nama}, saya ${rsvp.nama} ingin mengubah konfirmasi kehadiran Tiska Open Table (kode ${rsvp.kode}).`,
  );

  const isiConfirmed = `
    <p style="margin:0 0 6px;font-size:13px;color:#a07c34">Kehadiran Anda tercatat</p>
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:400;color:#2a2418">Sampai jumpa, ${esc(rsvp.nama)}</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.75;color:#4a4537">
      Terima kasih telah mengonfirmasi kehadiran untuk <strong>${rsvp.pax} orang</strong>.
      Kursi Anda sudah kami siapkan.
    </p>
    ${barisDetail()}
    ${tombol(tautanTiket(rsvp.kode), "Simpan e-tiket Anda")}
    <p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#6b6557">
      Tunjukkan QR pada e-tiket saat tiba di lokasi.
      <a href="${esc(googleCalUrl())}" style="color:#a07c34">Simpan ke kalender</a>.
    </p>
    <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#9b9486">
      Perlu mengubah atau membatalkan? <a href="${esc(ubah)}" style="color:#a07c34">Hubungi ${esc(PIC.nama)}</a>.
    </p>`;

  const isiWaitlist = `
    <p style="margin:0 0 6px;font-size:13px;color:#a07c34">Anda masuk daftar tunggu</p>
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:400;color:#2a2418">Terima kasih, ${esc(rsvp.nama)}</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.75;color:#4a4537">
      Konfirmasi Anda kami terima. Kursi untuk sesi ini telah terisi penuh, sehingga
      nama Anda kami tempatkan pada daftar tunggu. Kami akan mengabari secara pribadi
      begitu ada tempat yang tersedia.
    </p>
    ${barisDetail()}
    <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#9b9486">
      Pertanyaan: <a href="${esc(ubah)}" style="color:#a07c34">${esc(PIC.nama)} · ${esc(tampilHp(PIC.hp))}</a>
    </p>`;

  const isiDeclined = `
    <p style="margin:0 0 6px;font-size:13px;color:#a07c34">Konfirmasi diterima</p>
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:400;color:#2a2418">Terima kasih, ${esc(rsvp.nama)}</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.75;color:#4a4537">
      Kami mencatat bahwa Anda berhalangan hadir. Terima kasih telah menyempatkan
      diri mengabari kami — semoga ada kesempatan lain untuk duduk bersama.
    </p>
    <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#9b9486">
      Berubah pikiran? <a href="${esc(ubah)}" style="color:#a07c34">Hubungi ${esc(PIC.nama)}</a>.
    </p>`;

  const varian =
    rsvp.status === "confirmed"
      ? { eyebrow: "Konfirmasi Kehadiran", subject: `Kehadiran Anda tercatat — ${acara.nama}`, isi: isiConfirmed }
      : rsvp.status === "waitlist"
        ? { eyebrow: "Daftar Tunggu", subject: `Daftar tunggu — ${acara.nama}`, isi: isiWaitlist }
        : { eyebrow: "Konfirmasi Diterima", subject: `Terima kasih atas kabarnya — ${acara.nama}`, isi: isiDeclined };

  return sendEmail({
    to: rsvp.email,
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    subject: varian.subject,
    html: bingkai(varian.eyebrow, varian.isi),
  });
}

// ─── 3) Notifikasi referral (internal) ────────────────────────────────────────

/** Ini masuk ke Ida/Rama, bukan ke orang yang direkomendasikan. */
export async function kirimEmailReferral(ref: Referral): Promise<boolean> {
  const perujuk = ref.referrerNama || "Seorang tamu";
  const isi = `
    <p style="margin:0 0 6px;font-size:13px;color:#a07c34">Rekomendasi tamu baru</p>
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:400;color:#2a2418">${esc(ref.nama)}</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.75;color:#4a4537">
      ${esc(perujuk)} merekomendasikan nama di atas untuk diundang ke ${esc(acara.nama)}.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;font-size:14px;color:#4a4537;line-height:1.7">
      <tr><td style="padding:2px 14px 2px 0;color:#a07c34">Jabatan</td><td>${esc(ref.jabatan || "—")}</td></tr>
      <tr><td style="padding:2px 14px 2px 0;color:#a07c34">Perusahaan</td><td>${esc(ref.perusahaan || "—")}</td></tr>
      <tr><td style="padding:2px 14px 2px 0;color:#a07c34">Kontak</td><td>${esc(ref.kontak)}</td></tr>
      <tr><td style="padding:2px 14px 2px 0;color:#a07c34">Pengiriman</td><td>${ref.channel === "sendiri" ? "Dikirim sendiri oleh perujuk" : "Dititipkan ke Tiska"}</td></tr>
    </table>
    ${tombol(`${SITE_URL}/admin/open-table/referral`, "Buka daftar referral")}`;

  return sendEmail({
    to: EMAIL_NOTIFY_TO,
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    subject: `Rekomendasi tamu: ${ref.nama} — ${acara.nama}`,
    html: bingkai("Open Table · Referral", isi),
  });
}
