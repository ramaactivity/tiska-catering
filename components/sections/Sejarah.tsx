"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sejarah, timeline } from "@/lib/content";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sejarah: GSAP pinned scrollytelling — satu-satunya efek berat (docs/04 #4).
 * Foto & section menempel (pin), tahun 1980→2024 berganti seiring scroll.
 * Mobile & prefers-reduced-motion: degrade ke timeline statis yang anggun.
 */
export default function Sejarah({ photo = images.sejarah }: { photo?: { src: string; alt: string } }) {
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

    const eras = gsap.utils.toArray<HTMLElement>(
      "[data-era]",
      sectionRef.current,
    );

    // Crossfade diikat langsung ke posisi scroll (scrub), bukan toggle CSS —
    // mulus dua arah dan tidak pernah "restart" di tengah transisi.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${timeline.length * 85}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setActive(
            Math.min(
              timeline.length - 1,
              Math.floor(self.progress * timeline.length),
            ),
          );
        },
      },
    });

    gsap.set(eras, { autoAlpha: 0, y: 44 });
    gsap.set(eras[0], { autoAlpha: 1, y: 0 });

    // Timeline berdurasi N unit (1 unit = 1 era). Di tiap batas era j,
    // era lama naik-menghilang & era baru masuk dari bawah (durasi 0.45 unit).
    eras.forEach((el, i) => {
      if (i === 0) return;
      tl.to(
        eras[i - 1],
        { autoAlpha: 0, y: -44, duration: 0.45 },
        i - 0.225,
      ).fromTo(
        el,
        { autoAlpha: 0, y: 44 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        i - 0.225,
      );
    });
    // jeda tahan untuk era terakhir hingga akhir rentang scroll
    tl.set({}, {}, timeline.length);

    // Foto latar zoom pelan sepanjang pin — perjalanan waktu terasa mendekat
    tl.fromTo(
      "[data-sejarah-foto]",
      { scale: 1.04 },
      { scale: 1.18, duration: timeline.length, ease: "none" },
      0,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [pinned]);

  const background = (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dimming via overlay (komposit murah), bukan filter brightness —
          filter di container yang di-pin dipaksa re-raster tiap frame.
          Wrapper data-sejarah-foto di-zoom pelan oleh timeline scrub. */}
      <div data-sejarah-foto className="absolute inset-0 will-change-transform">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,10,0.95),rgba(14,13,10,0.8))]" />
    </div>
  );

  if (!pinned) {
    // Versi statis: timeline grid di atas foto (mobile / reduced motion)
    return (
      <section className="relative isolate overflow-hidden px-6 py-[20vh] md:px-10">
        {background}
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <Eyebrow className="mb-6">{sejarah.eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mb-16 max-w-[540px] font-display text-[clamp(34px,5.5vw,80px)] font-light leading-[0.96] tracking-[-0.025em] text-paper">
            <WordReveal segments={sejarah.judul} />
          </h2>
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
      className="relative isolate flex h-screen flex-col justify-center overflow-hidden px-10"
    >
      {background}
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <Eyebrow className="mb-6">{sejarah.eyebrow}</Eyebrow>
        </Reveal>
        <h2 className="mb-14 max-w-[540px] font-display text-[clamp(34px,4.5vw,64px)] font-light leading-[0.96] tracking-[-0.025em] text-paper">
          <WordReveal segments={sejarah.judul} />
        </h2>

        {/* Era ditumpuk; opacity & posisi dikendalikan GSAP timeline (scrub) —
            jangan beri kelas transition di sini, akan bertabrakan dengan GSAP */}
        <div className="relative h-[280px]">
          {timeline.map((era, i) => (
            <div
              key={era.tahun}
              data-era
              aria-hidden={i !== active}
              className={`pointer-events-none absolute inset-0 will-change-[transform,opacity] ${
                i === 0 ? "" : "opacity-0"
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
