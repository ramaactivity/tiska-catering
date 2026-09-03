/**
 * Pengirim email generik via REST API Resend — tanpa dependency SDK.
 *
 * lib/special-days/reminder.ts punya send() sendiri yang privat dan
 * meng-hardcode REMINDER_TO/REMINDER_FROM; file ini adalah versi umum untuk
 * fitur lain. reminder.ts sengaja tidak diubah (cron-nya sudah jalan).
 *
 * Aman no-op (mengembalikan false) bila RESEND_API_KEY belum diset.
 */

import "server-only";

export type MailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
};

const ENDPOINT = "https://api.resend.com/emails";

function payload(m: MailInput) {
  const to = (Array.isArray(m.to) ? m.to : m.to.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    from: m.from || "Tiska Catering <onboarding@resend.dev>",
    to,
    subject: m.subject,
    html: m.html,
    ...(m.text ? { text: m.text } : {}),
    ...(m.replyTo ? { reply_to: m.replyTo } : {}),
  };
}

export async function sendEmail(m: MailInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const body = payload(m);
  if (!body.to.length) return false;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Kirim banyak email terpersonalisasi dalam satu permintaan (maks 100 per batch).
 * Perulangan 50 fetch berurutan bisa menyentuh batas waktu fungsi serverless.
 */
export async function sendEmailBatch(
  list: MailInput[],
): Promise<{ sent: number; failed: number }> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !list.length) return { sent: 0, failed: list.length };

  let sent = 0;
  let failed = 0;
  for (let i = 0; i < list.length; i += 100) {
    const batch = list.slice(i, i + 100).map(payload).filter((b) => b.to.length);
    if (!batch.length) continue;
    try {
      const res = await fetch(`${ENDPOINT}/batch`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify(batch),
      });
      if (res.ok) sent += batch.length;
      else failed += batch.length;
    } catch {
      failed += batch.length;
    }
  }
  return { sent, failed };
}
