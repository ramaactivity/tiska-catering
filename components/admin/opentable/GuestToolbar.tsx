"use client";

import { useState } from "react";
import { guestAdminCopy } from "@/lib/opentable/content";

/**
 * Salin seluruh pasangan "nama<tab>tautan" ke papan klip — siap ditempel ke
 * Excel atau Google Sheets bila Rama mau membagi tugas kirim ke beberapa orang.
 */
export default function CopyAllButton({ baris }: { baris: string }) {
  const [selesai, setSelesai] = useState(false);

  async function salin() {
    try {
      await navigator.clipboard.writeText(baris);
      setSelesai(true);
      setTimeout(() => setSelesai(false), 1800);
    } catch {
      /* papan klip ditolak browser — abaikan */
    }
  }

  return (
    <button
      type="button"
      onClick={salin}
      className="rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent"
    >
      {selesai ? guestAdminCopy.salinSemuaSelesai : guestAdminCopy.salinSemua}
    </button>
  );
}
