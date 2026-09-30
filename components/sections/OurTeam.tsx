"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamGroup, TeamMember } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import { useMotionProfile } from "@/components/motion/useMotionProfile";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

type Photos = Record<string, { src: string; alt: string }>;
type RosterItem = TeamMember & { group: string; no: string; lead: boolean };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Daftar datar + nomor urut + label tier + tanda pimpinan. */
function buildRoster(groups: TeamGroup[]): RosterItem[] {
  let seq = 0;
  return groups.flatMap((g) =>
    g.members.map((m) => ({
      ...m,
      group: g.label,
      no: String(++seq).padStart(2, "0"),
      lead: !!g.featured,
    })),
  );
}

function initials(nama: string): string {
  const clean = nama
    .split(",")[0]
    .replace(/\b(dr|drg|ir|h|hj|prof)\.?/gi, "")
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

/** Bracket sudut emas yang "mengunci" ke posisi saat aktif. */
function Corners({ on }: { on: boolean }) {
  const base =
    "pointer-events-none absolute h-3.5 w-3.5 border-gold transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  const show = on ? "opacity-100" : "opacity-0";
  return (
    <>
      <span aria-hidden className={`${base} ${show} rounded-tl-[5px] border-l border-t ${on ? "left-2.5 top-2.5" : "left-1 top-1"}`} />
      <span aria-hidden className={`${base} ${show} rounded-tr-[5px] border-r border-t ${on ? "right-2.5 top-2.5" : "right-1 top-1"}`} />
      <span aria-hidden className={`${base} ${show} rounded-bl-[5px] border-b border-l ${on ? "bottom-2.5 left-2.5" : "bottom-1 left-1"}`} />
      <span aria-hidden className={`${base} ${show} rounded-br-[5px] border-b border-r ${on ? "bottom-2.5 right-2.5" : "bottom-1 right-1"}`} />
    </>
  );
}

export default function OurTeam({ photos = images.team, lang = "id" }: { photos?: Photos; lang?: Lang }) {
  const { teamHeader, teamGroups, ui } = t(lang);
  const roster = buildRoster(teamGroups);
  const [activeId, setActiveId] = useState(roster[0]?.id ?? "");
  const [touched, setTouched] = useState(false);
  const { reduce, lite } = useMotionProfile();
  const active = roster.find((r) => r.id === activeId) ?? roster[0];

  const select = (id: string) => {
    setActiveId(id);
    setTouched(true);
  };

  return (
    <section
      id="tim"
      className="relative overflow-hidden border-t border-white/[0.07] bg-ink px-6 py-20 md:px-10 md:py-[15vh]"
    >
      {/* Glow emas hangat */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[900px] -translate-x-1/2 opacity-[0.12] blur-[130px]"
        style={{ background: "radial-gradient(circle, #c4a05a 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <Eyebrow tone="dark" className="mb-6">
                {teamHeader.eyebrow}
              </Eyebrow>
            </Reveal>
            <h2 className="font-display text-[clamp(32px,5vw,72px)] font-light leading-[0.98] tracking-[-0.025em] text-paper">
              <WordReveal segments={teamHeader.judul} accentClass="text-gold-soft" />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-[400px] text-[14.5px] leading-[1.9] text-[#a39b8a]">
              {teamHeader.deskripsi}
            </p>
          </Reveal>
        </div>

        {/* Strip nilai */}
        <Reveal delay={0.1}>
          <ul className="mb-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-white/[0.07] py-4 text-[11px] uppercase tracking-[0.26em] text-[#b6ad9c]">
            <li className="text-[10px] tracking-[0.3em] text-gold-soft/80">Yang kami pegang</li>
            {teamHeader.nilai.map((v) => (
              <li key={v} className="flex items-center gap-7">
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold/60" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── Dinding mosaik wajah ─────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:gap-3 lg:grid-cols-6">
          {roster.map((m, i) => {
            const foto = photos[m.id];
            const on = m.id === activeId;
            return (
              <motion.button
                key={m.id}
                type="button"
                onMouseEnter={() => select(m.id)}
                onFocus={() => select(m.id)}
                onClick={() => select(m.id)}
                aria-pressed={on}
                aria-label={`${m.nama}, ${m.jabatan}`}
                data-on={on}
                initial={reduce ? false : { opacity: 0, filter: lite ? "blur(0px)" : "blur(10px)", scale: 0.94 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, delay: Math.min(i, 11) * 0.045, ease: EASE }}
                className="group relative aspect-square overflow-hidden rounded-md bg-ink-2 ring-1 ring-inset ring-white/[0.06] transition-[transform,box-shadow,outline-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline outline-1 -outline-offset-1 outline-transparent will-change-transform focus:outline-none focus-visible:outline-gold/70 data-[on=true]:-translate-y-1 data-[on=true]:outline-gold/40 data-[on=true]:shadow-[0_24px_60px_-26px_rgba(196,160,90,0.6)]"
              >
                {foto?.src ? (
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 22vw, 30vw"
                    className={`object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                      on
                        ? "scale-[1.07] grayscale-0 brightness-100"
                        : "grayscale brightness-[0.66] group-hover:grayscale-0 group-hover:brightness-100"
                    }`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-ink-3 to-ink">
                    <span
                      aria-hidden
                      style={{ fontVariationSettings: "'opsz' 144" }}
                      className={`font-display text-[clamp(22px,3vw,34px)] font-light transition-colors duration-300 ${
                        on ? "text-gold/70" : "text-gold/30"
                      }`}
                    >
                      {initials(m.nama)}
                    </span>
                  </div>
                )}

                {/* Scrim bawah — kedalaman + nomor terbaca */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/85 to-transparent"
                />

                {/* Veil saat tidak aktif → menyatu jadi "dinding" */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-500 ${
                    on ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                  }`}
                />

                <Corners on={on} />

                {/* Nomor + penanda pimpinan */}
                <span
                  className={`absolute bottom-2.5 left-7 flex items-center gap-1.5 font-display text-[10px] tabular-nums tracking-wider transition-colors duration-300 ${
                    on ? "text-gold-soft" : "text-paper/55"
                  }`}
                >
                  {m.lead && (
                    <span
                      aria-hidden
                      title={ui.pimpinan}
                      className={`h-1 w-1 rounded-full ${on ? "bg-gold" : "bg-gold/70"}`}
                    />
                  )}
                  {m.no}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Panel detail ─────────────────────────────────────────────────── */}
        <div className="mt-12 grid items-start gap-y-8 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10">
          {/* Nama besar */}
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="md:col-span-6"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-gold-soft">
              {active.group}
              <span className="text-paper/30">
                {" "}· {active.no} / {String(roster.length).padStart(2, "0")}
              </span>
            </p>
            <h3 className="font-display text-[clamp(34px,4.8vw,66px)] font-light leading-[0.98] tracking-[-0.025em] text-paper">
              {active.nama}
            </h3>
            <p className="mt-4 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#b6ad9c]">
              <span aria-hidden className="inline-block h-2 w-2 bg-gold" />
              {active.jabatan}
            </p>
          </motion.div>

          {/* Bio */}
          <div className="md:col-span-6 md:border-l md:border-white/10 md:pl-10">
            <motion.p
              key={`${active.id}-bio`}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
              className="text-[15.5px] leading-[1.95] text-[#b3ab9a]"
            >
              {active.bio}
            </motion.p>
            <p
              className={`mt-7 flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.24em] text-[#5f5849] transition-opacity duration-700 ${
                touched ? "opacity-0" : "opacity-100"
              }`}
            >
              <span aria-hidden className="inline-block h-px w-6 bg-[#5f5849]" />
              <span className="lg:hidden">Ketuk wajah untuk mengenal mereka</span>
              <span className="hidden lg:inline">Sorot wajah untuk mengenal mereka</span>
            </p>
          </div>
        </div>

        {/* Hanya anggota yang sedang disorot yang namanya, jabatannya, dan
            bionya dirender. Dari sebelas orang, sepuluh sisanya tidak pernah
            ada sebagai teks — padahal justru daftar ini yang menunjukkan
            keahlian di balik dapur. Cermin di bawah memuat seluruhnya. */}
        <div className="sr-only">
          {roster.map((m) => (
            <div key={`teks-${m.id}`}>
              <h3>{m.nama}</h3>
              <p>{m.jabatan}</p>
              {m.bio && <p>{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
