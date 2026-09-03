"use client";

import { useState, useTransition } from "react";
import { markGuestSentAction } from "@/lib/opentable/actions";

/**
 * Tombol kirim & salin tautan.
 *
 * Tombol WhatsApp sengaja berupa <a target="_blank"> sungguhan dengan server
 * action di onClick — bukan `await action(); window.open(...)`, yang diblokir
 * Safari karena jendela dibuka di luar gesture pengguna.
 */
export default function SendButtons({
  id,
  waHref,
  tautan,
  punyaHp,
}: {
  id: string;
  waHref: string;
  tautan: string;
  punyaHp: boolean;
}) {
  const [, mulai] = useTransition();
  const [tersalin, setTersalin] = useState(false);

  function tandaiTerkirim() {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("channel", "wa");
    mulai(() => {
      void markGuestSentAction(fd);
    });
  }

  async function salin() {
    try {
      await navigator.clipboard.writeText(tautan);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1800);
    } catch {
      /* clipboard ditolak — abaikan, tautan tetap terlihat di kolomnya */
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={salin}
        className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
      >
        {tersalin ? "Tersalin" : "Salin tautan"}
      </button>
      {punyaHp && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={tandaiTerkirim}
          className="rounded-lg border border-ad-border px-2.5 py-1.5 text-[12px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent"
        >
          Kirim WA
        </a>
      )}
    </div>
  );
}
