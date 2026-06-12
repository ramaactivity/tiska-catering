"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuRingkas } from "@/lib/content";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Button from "@/components/ui/Button";

/**
 * Menu ringkas (docs/04 #7) — split stage:
 * kiri daftar kategori, kanan panggung foto sticky yang crossfade
 * mengikuti baris yang di-hover/fokus. Foto punya area sendiri —
 * tidak pernah menimpa teks. Semua transisi transform/opacity (GPU).
 * Mobile: daftar + thumbnail kecil. Tiap baris menaut ke /menu#kategori.
 */
export default function MenuRingkas() {
  const [active, setActive] = useState(0);
  const aktif = menuRingkas.tiles[active];

  return (
    <section className="bg-ink px-6 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-teal">
            {menuRingkas.eyebrow}
          </p>
        </Reveal>
        <h2 className="mb-14 font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
          <WordReveal segments={menuRingkas.judul} />
        </h2>

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Daftar kategori */}
          <div className="md:col-span-7">
            {menuRingkas.tiles.map((tile, i) => {
              const foto = images.menuRingkas[tile.id];
              return (
                <Reveal key={tile.id} delay={i * 0.05} duration={0.8} y={18}>
                  <Link
                    href={`/menu#${tile.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 border-b border-line py-5 first:border-t md:gap-7 md:py-6"
                  >
                    <span
                      className={`shrink-0 font-display text-[13px] tracking-[0.1em] transition-colors duration-500 ${
                        i === active ? "text-gold-bright" : "text-gold-deep"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-[clamp(24px,3vw,42px)] font-light leading-[1.1] transition-colors duration-500 ${
                          i === active ? "text-gold-soft" : "text-paper"
                        }`}
                      >
                        {tile.nama}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-[1.6] text-[#9a9282] md:hidden">
                        {tile.highlight}
                      </span>
                    </span>

                    {/* Thumbnail mobile (panggung foto hanya md+) */}
                    {foto && (
                      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-md md:hidden">
                        <Image
                          src={foto.src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    )}

                    <span
                      aria-hidden
                      className={`hidden shrink-0 text-[18px] text-gold-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
                        i === active
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Panggung foto sticky */}
          <div className="hidden md:col-span-5 md:block">
            <Reveal delay={0.15} className="md:sticky md:top-[14vh]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                {menuRingkas.tiles.map((tile, i) => {
                  const foto = images.menuRingkas[tile.id];
                  if (!foto) return null;
                  return (
                    <Image
                      key={tile.id}
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        i === active
                          ? "scale-100 opacity-100"
                          : "scale-[1.06] opacity-0"
                      }`}
                    />
                  );
                })}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,13,10,0.82))]"
                />
                {/* Caption kategori aktif — area khusus, tidak menimpa daftar */}
                <div className="absolute inset-x-7 bottom-6">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                    {String(active + 1).padStart(2, "0")} —{" "}
                    {aktif.nama}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.7] text-paper/80">
                    {aktif.highlight}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <Button href={menuRingkas.cta.href}>{menuRingkas.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
