"use client";

import { company } from "@/lib/content";
import { landingUi } from "@/lib/landing";
import type { Lang } from "@/lib/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import RichTitle from "@/components/ui/RichTitle";

type Props = {
  lang: Lang;
  corporate: boolean;
  /** Jenis acara bawaan, mis. "Katering Korporat" */
  jenisDefault: string;
  /** Tautan company profile — hanya dirender bila file ada */
  profileHref?: string;
};

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-paper placeholder:text-[#6f685c] focus:border-gold focus:outline-none";

/**
 * Formulir penawaran tanpa backend: isian dirangkai jadi pesan lalu dibuka di
 * WhatsApp tim Tiska (CTA utama, keputusan Rama 11 Jun 2026).
 */
export default function QuoteForm({ lang, corporate, jenisDefault, profileHref }: Props) {
  const t = landingUi[lang].quote;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const baris = [...data.entries()]
      .filter(([, v]) => String(v).trim())
      .map(([k, v]) => `${k}: ${String(v).trim()}`);
    const text = [t.salam, "", ...baris].join("\n");
    window.open(`${company.whatsappLink}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  return (
    <section id="penawaran" className="bg-ink px-6 py-20 md:px-10 md:py-[14vh]">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <div>
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <h2 className="mt-7 font-display text-[clamp(32px,4.4vw,60px)] font-light leading-[1] tracking-[-0.02em] text-paper">
            <RichTitle segments={t.judul} />
          </h2>
          <p className="mt-6 max-w-[380px] text-[14.5px] leading-[1.85] text-[#a39b8a]">
            {t.intro}
          </p>
          {profileHref && (
            <a
              href={profileHref}
              download
              className="mt-10 inline-flex items-center gap-2.5 border-b border-gold-soft pb-1 text-[13px] uppercase tracking-[0.1em] text-gold-soft transition-colors hover:text-paper"
            >
              {landingUi[lang].unduhProfil} <span aria-hidden>↓</span>
            </a>
          )}
        </div>

        <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.nama}</span>
            <input name={t.nama} required autoComplete="name" className={FIELD} />
          </label>
          {corporate && (
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.perusahaan}</span>
              <input name={t.perusahaan} autoComplete="organization" className={FIELD} />
            </label>
          )}
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.jenis}</span>
            <input name={t.jenis} defaultValue={jenisDefault} className={FIELD} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.tanggal}</span>
            <input name={t.tanggal} type="date" className={`${FIELD} [color-scheme:dark]`} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.tamu}</span>
            <input name={t.tamu} type="number" min={1} inputMode="numeric" className={FIELD} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.lokasi}</span>
            <input name={t.lokasi} className={FIELD} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">{t.catatan}</span>
            <textarea name={t.catatan} rows={3} className={`${FIELD} resize-none`} />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="group relative mt-2 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-paper px-10 py-4 text-[13px] uppercase tracking-[0.1em] text-paper transition-colors duration-500 hover:text-ink"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              <span className="relative">{t.kirim}</span>
              <span aria-hidden className="relative">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
