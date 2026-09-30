"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { FaqBlock } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import RichTitle from "@/components/ui/RichTitle";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
// Pegas lembut untuk indikator yang "meluncur" (magic-move).
const SLIDE = { type: "spring", stiffness: 380, damping: 34 } as const;

// Daftar pertanyaan stagger-in tiap ganti topik.
const LIST_V: Variants = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const ROW_V: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
// Isi jawaban naik berurutan saat dibuka.
const BLOCK_V: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/**
 * FAQ — section terang (memecah deret gelap Testimoni→CTA) dengan navigasi
 * kategori + accordion satu-terbuka. Tujuan: pengunjung tidak dihantam semua
 * pertanyaan sekaligus; pilih topik, buka satu per satu. (docs/02: anggun, tenang)
 */
export default function FAQ({ lang = "id" }: { lang?: Lang }) {
  const { faqHeader, faqCategories } = t(lang);
  // Kategori aktif & pertanyaan terbuka (single-open agar bersih).
  const [activeCat, setActiveCat] = useState(0);
  const [openQ, setOpenQ] = useState(0);
  const reduce = useReducedMotion();

  const cat = faqCategories[activeCat];

  const selectCat = (i: number) => {
    setActiveCat(i);
    setOpenQ(0); // buka pertanyaan pertama saat ganti topik
  };

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-paper-bg px-6 pb-20 pt-16 text-paper-ink md:scroll-mt-28 md:px-10 md:pb-[16vh] md:pt-[12vh]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header — judul kiri, deskripsi kanan-bawah (selaras pola MengapaTiska,
            mengisi ruang kanan-atas agar tidak kosong melompong). */}
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[680px]">
            <Reveal>
              <Eyebrow tone="light">{faqHeader.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-7 font-display text-[clamp(34px,5.5vw,76px)] font-light leading-[0.96] tracking-[-0.025em]">
              <RichTitle segments={faqHeader.judul} accentClass="text-gold-deep" />
            </h2>
          </div>
          <Reveal delay={0.12} className="md:pb-2">
            <p className="max-w-[360px] text-[15px] leading-[1.8] text-paper-ink/65">
              {faqHeader.deskripsi}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[300px_1fr] lg:gap-x-20">
          {/* ── Navigasi kategori ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CategoryNav active={activeCat} onSelect={selectCat} lang={lang} />

            {/* Kartu "masih ada pertanyaan?" — hanya tampil di desktop di kolom kiri */}
            <div className="mt-10 hidden border-t border-line-d pt-8 lg:block">
              <p className="text-[14px] leading-[1.6] text-paper-ink/70">
                {faqHeader.ctaTanya}
              </p>
              <ContactButton className="mt-5" lang={lang} />
            </div>
          </div>

          {/* ── Daftar pertanyaan (accordion) ── */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.ul
                key={cat.id}
                className="border-t border-line-d"
                initial={reduce ? false : "hidden"}
                animate="show"
                exit={reduce ? undefined : "exit"}
                variants={reduce ? undefined : LIST_V}
              >
                {cat.items.map((item, i) => (
                  <AccordionRow
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    open={openQ === i}
                    onToggle={() => setOpenQ(openQ === i ? -1 : i)}
                    variants={reduce ? undefined : ROW_V}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* Cermin teks kategori lain. Kategori tak aktif tidak dirender
                oleh accordion di atas, jadi tanpa blok ini hanya ~2 dari 17
                tanya-jawab yang ada di HTML — padahal JSON-LD mengumumkan 17.
                Isinya persis sama dengan yang didapat pengunjung saat
                mengklik tab, jadi ini bukan teks tersembunyi yang berbeda. */}
            <div className="sr-only">
              {faqCategories.map((c, i) =>
                i === activeCat ? null : (
                  <section key={c.id}>
                    <h3>{c.label}</h3>
                    {c.items.map((item) => (
                      <article key={item.q}>
                        <h4>{item.q}</h4>
                        <AnswerTeks blocks={item.a} />
                      </article>
                    ))}
                  </section>
                ),
              )}
            </div>

            {/* CTA versi mobile — di bawah daftar */}
            <div className="mt-12 border-t border-line-d pt-8 lg:hidden">
              <p className="text-[14px] leading-[1.6] text-paper-ink/70">
                {faqHeader.ctaTanya}
              </p>
              <ContactButton className="mt-5" lang={lang} />
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
  lang,
}: {
  active: number;
  onSelect: (i: number) => void;
  lang: Lang;
}) {
  const { faqCategories, ui } = t(lang);
  return (
    <nav aria-label={ui.faqNav}>
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
                className="group relative flex w-full items-start gap-3.5 rounded-md py-3 pl-4 pr-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep/50"
              >
                {/* Batang emas yang meluncur antar kategori (magic-move) */}
                {isActive && (
                  <motion.span
                    layoutId="faq-rail-bar"
                    aria-hidden
                    transition={SLIDE}
                    className="absolute left-0 top-[19%] h-[62%] w-[2px] rounded-full bg-gold-deep"
                  />
                )}
                {/* Petunjuk hover untuk item non-aktif */}
                {!isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-gold-deep/50 transition-all duration-300 group-hover:h-[28%]"
                  />
                )}
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
                        : "text-paper-ink/65 group-hover:text-paper-ink/90"
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
  question,
  answer,
  open,
  onToggle,
  variants,
}: {
  question: string;
  answer: FaqBlock[];
  open: boolean;
  onToggle: () => void;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <motion.li variants={variants} className="border-b border-line-d">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group relative flex w-full items-start gap-5 rounded-sm py-[22px] pl-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep/40 md:py-6"
        >
          {/* Tick emas pada pertanyaan terbuka — meluncur antar pertanyaan */}
          {open && (
            <motion.span
              layoutId="faq-q-bar"
              aria-hidden
              transition={SLIDE}
              className="absolute left-0 top-1/2 -mt-2.5 h-5 w-[2px] rounded-full bg-gold-deep"
            />
          )}
          <span
            className={`flex-1 text-[clamp(16px,1.85vw,20px)] font-normal leading-snug tracking-[-0.005em] transition-[color,transform] duration-300 group-hover:translate-x-[3px] ${
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

      {/* Panel TIDAK dilepas saat tertutup — hanya diciutkan. Dulu memakai
          AnimatePresence, sehingga dari 17 jawaban hanya satu yang ada di
          HTML; mesin pencari dan asisten AI tidak pernah membaca sisanya. */}
      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                height: { duration: 0.45, ease: EASE },
                opacity: { duration: 0.35, ease: "easeInOut" },
              }
        }
        className="overflow-hidden"
      >
        <div className="max-w-[62ch] pb-8 pl-5 md:pb-9">
          <Answer blocks={answer} open={open} />
        </div>
      </motion.div>
    </motion.li>
  );
}

/* ── Render isi jawaban: paragraf & daftar berlabel (naik berurutan saat buka) ── */
function Answer({ blocks, open = true }: { blocks: FaqBlock[]; open?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={reduce ? false : "hidden"}
      animate={open ? "show" : "hidden"}
      variants={
        reduce
          ? undefined
          : { show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }
      }
    >
      {blocks.map((block, i) =>
        "p" in block ? (
          <motion.p
            key={i}
            variants={reduce ? undefined : BLOCK_V}
            className="text-[15px] leading-[1.8] text-paper-ink/75"
          >
            {block.p}
          </motion.p>
        ) : (
          <motion.ul
            key={i}
            variants={reduce ? undefined : BLOCK_V}
            className="flex flex-col gap-3"
          >
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
                    <span className="font-medium text-paper-ink">{row.term}</span>
                  )}
                  {row.term && " — "}
                  {row.text}
                </span>
              </li>
            ))}
          </motion.ul>
        ),
      )}
    </motion.div>
  );
}

/* ── Tombol kontak WhatsApp (pill, tone terang — selaras docs/02) ── */
function ContactButton({ className = "", lang }: { className?: string; lang: Lang }) {
  const { faqHeader } = t(lang);
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

/* ── Versi teks polos jawaban, untuk cermin kategori non-aktif ── */
function AnswerTeks({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        "p" in block ? (
          <p key={i}>{block.p}</p>
        ) : (
          <ul key={i}>
            {block.list.map((row, j) => (
              <li key={j}>
                {row.term ? `${row.term}: ` : ""}
                {row.text}
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}
