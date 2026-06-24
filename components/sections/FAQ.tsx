"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqHeader, faqCategories, type FaqBlock } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import RichTitle from "@/components/ui/RichTitle";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * FAQ — section terang (memecah deret gelap Testimoni→CTA) dengan navigasi
 * kategori + accordion satu-terbuka. Tujuan: pengunjung tidak dihantam semua
 * pertanyaan sekaligus; pilih topik, buka satu per satu. (docs/02: anggun, tenang)
 */
export default function FAQ() {
  // Kategori aktif & pertanyaan terbuka (single-open agar bersih).
  const [activeCat, setActiveCat] = useState(0);
  const [openQ, setOpenQ] = useState(0);

  const cat = faqCategories[activeCat];

  const selectCat = (i: number) => {
    setActiveCat(i);
    setOpenQ(0); // buka pertanyaan pertama saat ganti topik
  };

  return (
    <section
      id="faq"
      className="bg-paper-bg px-6 py-[16vh] text-paper-ink md:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-14 max-w-[640px] md:mb-20">
          <Reveal>
            <Eyebrow tone="light">{faqHeader.eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mt-7 font-display text-[clamp(34px,5.5vw,76px)] font-light leading-[0.96] tracking-[-0.025em]">
            <RichTitle segments={faqHeader.judul} accentClass="text-gold-deep" />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[460px] text-[15px] leading-[1.8] text-paper-ink/60">
              {faqHeader.deskripsi}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[300px_1fr] lg:gap-x-20">
          {/* ── Navigasi kategori ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CategoryNav
              active={activeCat}
              onSelect={selectCat}
            />

            {/* Kartu "masih ada pertanyaan?" — hanya tampil di desktop di kolom kiri */}
            <div className="mt-10 hidden border-t border-line-d pt-8 lg:block">
              <p className="text-[14px] leading-[1.6] text-paper-ink/70">
                {faqHeader.ctaTanya}
              </p>
              <ContactButton className="mt-5" />
            </div>
          </div>

          {/* ── Daftar pertanyaan (accordion) ── */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ul className="border-t border-line-d">
                  {cat.items.map((item, i) => (
                    <AccordionRow
                      key={item.q}
                      index={i}
                      question={item.q}
                      answer={item.a}
                      open={openQ === i}
                      onToggle={() => setOpenQ(openQ === i ? -1 : i)}
                    />
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* CTA versi mobile — di bawah daftar */}
            <div className="mt-12 border-t border-line-d pt-8 lg:hidden">
              <p className="text-[14px] leading-[1.6] text-paper-ink/70">
                {faqHeader.ctaTanya}
              </p>
              <ContactButton className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Navigasi kategori: rail vertikal (desktop) / chip horizontal (mobile) ── */
function CategoryNav({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav aria-label="Kategori pertanyaan">
      {/* Desktop: daftar vertikal */}
      <ul className="hidden flex-col gap-1 lg:flex">
        {faqCategories.map((c, i) => {
          const isActive = i === active;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex w-full items-start gap-3.5 rounded-md py-3 pl-4 pr-3 text-left transition-colors duration-300"
              >
                {/* Penanda batang emas saat aktif */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-gold-deep transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "h-[62%]" : "group-hover:h-[28%]"
                  }`}
                />
                <span
                  className={`mt-px font-display text-[12px] tabular-nums transition-colors duration-300 ${
                    isActive ? "text-gold-deep" : "text-paper-ink/35"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`text-[15px] leading-tight transition-colors duration-300 ${
                      isActive
                        ? "text-paper-ink"
                        : "text-paper-ink/55 group-hover:text-paper-ink/80"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    className={`mt-1 overflow-hidden text-[12px] leading-snug text-paper-ink/40 transition-all duration-400 ${
                      isActive ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {c.ringkas}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile: chip horizontal yang bisa di-scroll */}
      <div className="-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {faqCategories.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-[12.5px] tracking-[0.01em] transition-colors duration-300 ${
                isActive
                  ? "border-gold-deep bg-gold-deep text-paper"
                  : "border-line-2 text-paper-ink/65"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ── Satu baris accordion ── */
function AccordionRow({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: FaqBlock[];
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <li className="border-b border-line-d">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-5 py-6 text-left md:py-7"
        >
          <span className="mt-2 hidden font-display text-[12px] tabular-nums text-gold-deep/70 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`flex-1 font-display text-[clamp(18px,2.1vw,24px)] font-light leading-snug tracking-[-0.01em] transition-colors duration-300 ${
              open ? "text-paper-ink" : "text-paper-ink/80 group-hover:text-paper-ink"
            }`}
          >
            {question}
          </span>
          {/* Ikon plus → silang saat terbuka */}
          <span
            aria-hidden
            className="relative mt-1.5 grid size-6 shrink-0 place-items-center"
          >
            <span className="absolute h-px w-3.5 bg-gold-deep" />
            <span
              className={`absolute h-px w-3.5 bg-gold-deep transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "rotate-0" : "rotate-90"
              }`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: EASE },
              opacity: { duration: 0.35, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <div className="max-w-[58ch] pb-7 pl-0 sm:pl-[2.4rem] md:pb-9">
              <Answer blocks={answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Render isi jawaban: paragraf & daftar berlabel ── */
function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) =>
        "p" in block ? (
          <p key={i} className="text-[15px] leading-[1.85] text-paper-ink/70">
            {block.p}
          </p>
        ) : (
          <ul key={i} className="flex flex-col gap-3">
            {block.list.map((row, j) => (
              <li
                key={j}
                className="flex gap-3.5 text-[14.5px] leading-[1.75] text-paper-ink/70"
              >
                <span
                  aria-hidden
                  className="mt-[0.55em] size-1 shrink-0 rounded-full bg-gold-deep"
                />
                <span>
                  {row.term && (
                    <span className="text-paper-ink">{row.term}</span>
                  )}
                  {row.term && " — "}
                  {row.text}
                </span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

/* ── Tombol kontak WhatsApp (pill, tone terang — selaras docs/02) ── */
function ContactButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={faqHeader.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold-deep/70 px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-gold-deep transition-colors duration-500 hover:text-ink active:scale-[0.98] ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative">{faqHeader.cta.label}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
