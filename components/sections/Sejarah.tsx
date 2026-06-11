"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sejarah, timeline } from "@/lib/content";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import RichTitle from "@/components/ui/RichTitle";
import Reveal from "@/components/motion/Reveal";

/**
 * Sejarah: GSAP pinned scrollytelling — satu-satunya efek berat (docs/04 #4).
 * Foto & section menempel (pin), tahun 1980→2024 berganti seiring scroll.
 * Mobile & prefers-reduced-motion: degrade ke timeline statis yang anggun.
 */
export default function Sejarah() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Scrollytelling hanya di layar md+ dan tanpa prefers-reduced-motion
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(desktop.matches && !reduce.matches);
    update();
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!pinned || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${timeline.length * 85}%`,
      pin: true,
      onUpdate: (self) => {
        setActive(
          Math.min(
            timeline.length - 1,
            Math.floor(self.progress * timeline.length),
          ),
        );
      },
    });

    return () => trigger.kill();
  }, [pinned]);

  const background = (
    <div aria-hidden className="absolute inset-0 -z-10">
      <Image
        src={images.sejarah.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover brightness-[0.32]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,10,0.85),rgba(14,13,10,0.45))]" />
    </div>
  );

  if (!pinned) {
    // Versi statis: timeline grid di atas foto (mobile / reduced motion)
    return (
      <section className="relative overflow-hidden px-6 py-[20vh] md:px-10">
        {background}
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <Eyebrow className="mb-6">{sejarah.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-16 max-w-[540px] font-display text-[clamp(34px,5.5vw,80px)] font-light leading-[0.96] tracking-[-0.025em] text-paper">
              <RichTitle segments={sejarah.judul} />
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            {timeline.map((era, i) => (
              <Reveal key={era.tahun} delay={i * 0.12}>
                <div className="border-t border-line-2 pt-6">
                  <p className="font-display text-[clamp(28px,3.2vw,46px)] font-light leading-none text-gold-soft">
                    {era.tahun}
                  </p>
                  <p className="mb-3 mt-3.5 text-[11.5px] uppercase tracking-[0.18em] text-paper">
                    {era.judul}
                  </p>
                  <p className="text-[13.5px] leading-[1.7] text-[#c0b9a9]">
                    {era.teks}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Versi pinned scrollytelling (desktop)
  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden px-10"
    >
      {background}
      <div className="mx-auto w-full max-w-[1280px]">
        <Eyebrow className="mb-6">{sejarah.eyebrow}</Eyebrow>
        <h2 className="mb-14 max-w-[540px] font-display text-[clamp(34px,4.5vw,64px)] font-light leading-[0.96] tracking-[-0.025em] text-paper">
          <RichTitle segments={sejarah.judul} />
        </h2>

        {/* Era aktif — semua era ditumpuk, transisi opacity + blur + naik */}
        <div className="relative h-[280px]">
          {timeline.map((era, i) => (
            <div
              key={era.tahun}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active
                  ? "translate-y-0 opacity-100 blur-0"
                  : "pointer-events-none translate-y-6 opacity-0 blur-sm"
              }`}
            >
              <p
                style={{ fontVariationSettings: "'opsz' 144" }}
                className="font-display text-[clamp(90px,12vw,170px)] font-light leading-[0.88] text-gold-soft"
              >
                {era.tahun}
              </p>
              <p className="mb-3 mt-5 text-[12px] uppercase tracking-[0.18em] text-paper">
                {era.judul}
              </p>
              <p className="max-w-[460px] text-[14.5px] leading-[1.75] text-[#c0b9a9]">
                {era.teks}
              </p>
            </div>
          ))}
        </div>

        {/* Penanda progres tahun */}
        <div className="mt-10 flex items-center gap-6 border-t border-line-2 pt-6">
          {timeline.map((era, i) => (
            <span
              key={era.tahun}
              className={`text-[12px] tracking-[0.1em] transition-colors duration-500 ${
                i === active ? "text-gold-bright" : "text-paper/30"
              }`}
            >
              {era.tahun}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
