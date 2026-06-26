"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sejarah, timeline } from "@/lib/content";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sejarah: GSAP pinned scrollytelling — satu-satunya efek berat (docs/04 #4).
 * Layout split editorial: narasi (tahun + cerita) rapat di kiri, foto landscape
 * "melayang" di kanan yang berganti per era dengan transisi push-zoom (bukan
 * fade datar). Mobile & prefers-reduced-motion: degrade ke kartu statis anggun.
 */
export default function Sejarah({
  photos = images.sejarahTimeline,
}: {
  photos?: { src: string; alt: string }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const fotos = photos;

  // Scrollytelling hanya di layar lg+ dan tanpa prefers-reduced-motion
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
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

    // GSAP + ScrollTrigger di-load on-demand (hanya desktop tanpa reduced-motion)
    // → keluar dari bundle JS awal. Logika timeline tidak berubah.
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    if (cancelled || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const eras = gsap.utils.toArray<HTMLElement>("[data-era]", sectionRef.current);
    const frames = gsap.utils.toArray<HTMLElement>(
      "[data-era-foto]",
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

    // Kondisi awal: era & polaroid pertama tampil; polaroid lain "terbalik" (3D).
    gsap.set(eras, { autoAlpha: 0, y: 40 });
    gsap.set(eras[0], { autoAlpha: 1, y: 0 });
    gsap.set(frames, {
      autoAlpha: 0,
      rotationY: -105,
      rotationX: 8,
      z: -80,
      transformOrigin: "50% 50%",
    });
    gsap.set(frames[0], { autoAlpha: 1, rotationY: 0, rotationX: 0, z: 0 });

    // Transisi per batas era — FLIP 3D seperti membalik foto di album kenangan:
    //  • Teks: lama naik-hilang, baru masuk dari bawah.
    //  • Polaroid lama berputar pergi (rotateY) lalu polaroid baru berputar masuk,
    //    sedikit miring (rotateX) & menjauh-mendekat (z) untuk kedalaman nyata.
    //  backface-hidden + perspective di induk; transform saja (hindari filter).
    eras.forEach((el, i) => {
      if (i === 0) return;
      const at = i - 0.25;
      tl.to(eras[i - 1], { autoAlpha: 0, y: -40, duration: 0.5 }, at)
        .fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          at,
        )
        // polaroid lama berputar pergi
        .to(
          frames[i - 1],
          {
            rotationY: 105,
            rotationX: 8,
            z: -80,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          at,
        )
        // polaroid baru berputar masuk (sedikit menyusul → terasa "dibalik")
        .fromTo(
          frames[i],
          { rotationY: -105, rotationX: 8, z: -80, autoAlpha: 0 },
          {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          at + 0.12,
        );
    });
    // jeda tahan untuk era terakhir hingga akhir rentang scroll
    tl.set({}, {}, timeline.length);

    cleanup = () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pinned]);

  // Latar gelap-tenang + glow emas halus di sisi kanan untuk mendudukkan foto.
  const stage = (
    <div aria-hidden className="absolute inset-0 -z-10 bg-[#0e0d0a]">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_78%_42%,rgba(201,167,107,0.13),transparent_56%)]" />
    </div>
  );

  const heading = (
    <>
      <Reveal>
        <Eyebrow className="mb-5">{sejarah.eyebrow}</Eyebrow>
      </Reveal>
      <h2 className="max-w-[460px] font-display text-[clamp(30px,3.6vw,52px)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
        <WordReveal segments={sejarah.judul} />
      </h2>
    </>
  );

  if (!pinned) {
    // Versi statis: kartu editorial landscape (foto + tahun + cerita).
    return (
      <section className="relative isolate overflow-hidden px-6 py-20 md:px-10 md:py-[16vh]">
        {stage}
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-14">{heading}</div>
          <div className="grid grid-cols-1 gap-x-9 gap-y-12 sm:grid-cols-2">
            {timeline.map((era, i) => (
              <Reveal key={era.tahun} delay={i * 0.1}>
                <article>
                  <div className="relative mb-5 aspect-[3/2] w-full overflow-hidden rounded-[12px] ring-1 ring-gold-soft/15">
                    <Image
                      src={fotos[i].src}
                      alt={fotos[i].alt}
                      fill
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-display text-[clamp(30px,5vw,46px)] font-light leading-none text-gold-soft">
                    {era.tahun}
                  </p>
                  <p className="mb-3 mt-3 text-[11.5px] uppercase tracking-[0.18em] text-paper">
                    {era.judul}
                  </p>
                  <p className="text-[13.5px] leading-[1.7] text-[#c0b9a9]">
                    {era.teks}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Versi pinned scrollytelling (desktop) — split editorial, foto landscape.
  // pt clamp menjamin jarak aman dari pill nav apa pun tinggi layarnya.
  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen flex-col justify-center overflow-hidden px-10 pb-[7vh] pt-[clamp(140px,17vh,210px)]"
    >
      {stage}
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[1.08fr_0.92fr] items-center gap-x-12">
        {/* Kolom kiri — narasi, dirapatkan jadi satu kluster */}
        <div>
          <div className="mb-11">{heading}</div>

          {/* Era ditumpuk; opacity & posisi dikendalikan GSAP (scrub) — jangan
              beri kelas transition di sini, akan bertabrakan dengan GSAP.
              Lockup: tahun (besar) + nama era (label) dibaca sebagai satu unit. */}
          <div className="relative h-[258px]">
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
                  className="font-display text-[clamp(76px,8.6vw,136px)] font-light leading-[0.84] text-gold-soft"
                >
                  {era.tahun}
                </p>
                <p className="mb-4 mt-5 text-[12.5px] uppercase tracking-[0.22em] text-gold-soft/70">
                  {era.judul}
                </p>
                <p className="max-w-[440px] text-[16px] leading-[1.8] text-[#d3cbbb]">
                  {era.teks}
                </p>
              </div>
            ))}
          </div>

          {/* Penanda progres tahun */}
          <div className="mt-8 flex items-center gap-6 border-t border-line-2 pt-6">
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

        {/* Kolom kanan — tumpukan POLAROID yang melayang miring & dibalik (flip 3D) */}
        <Reveal>
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [-1.6, 1.6, -1.6] }}
            transition={{
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative ml-auto w-full max-w-[500px]"
          >
            {/* Stack 3D — perspective di induk langsung agar flip terasa nyata */}
            <div
              className="relative aspect-[1/1.13]"
              style={{ perspective: "1500px" }}
            >
              {timeline.map((era, i) => (
                <div
                  key={era.tahun}
                  data-era-foto
                  aria-hidden={i !== active}
                  className={`absolute inset-0 flex flex-col rounded-[3px] bg-paper p-[15px] shadow-[0_45px_110px_-30px_rgba(0,0,0,0.85)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform ${
                    i === 0 ? "" : "opacity-0"
                  }`}
                >
                  <div className="relative flex-1 overflow-hidden bg-ink">
                    <Image
                      src={fotos[i].src}
                      alt={fotos[i].alt}
                      fill
                      sizes="(min-width: 1024px) 32vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Caption ala tulisan di bawah polaroid */}
                  <p className="pb-1 pt-3.5 text-center font-accent text-[17px] italic leading-none text-paper-ink/80">
                    {era.judul}
                    <span className="ml-2 not-italic text-paper-ink/45">
                      · {era.tahun}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
