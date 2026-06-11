import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import Counter from "@/components/motion/Counter";
import { hero, profil, reasons, type RichText } from "@/lib/content";
import { HERO_LOGO } from "@/lib/logos-base64";

/* Halaman sementara Fase 1 — pratinjau fondasi (token, font, motion).
   Section beranda sesungguhnya dibangun di Fase 2 (docs/04). */

function Rich({ segments }: { segments: RichText }) {
  return (
    <>
      {segments.map((s, i) =>
        s.italic ? (
          <em key={i} className="font-accent italic text-gold-soft">
            {s.text}
          </em>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-10">
      {/* Pratinjau hero — tipografi & token */}
      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <BlurToFocus>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_LOGO}
            alt="Logo Tiska Catering"
            className="mx-auto mb-10 h-36 w-auto"
          />
        </BlurToFocus>
        <Reveal delay={0.15}>
          <p className="mb-6 text-xs font-normal uppercase tracking-[0.34em] text-gold-soft">
            {hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h1 className="font-display text-5xl font-light leading-[1.1] md:text-7xl">
            <Rich segments={hero.judul} />
          </h1>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="mt-8 max-w-xl text-base text-paper/70">
            {hero.subjudul}
          </p>
        </Reveal>
      </section>

      {/* Pratinjau counter — Mengapa Tiska */}
      <section className="border-t border-line py-[16vh]">
        <Reveal>
          <p className="mb-12 text-center text-xs uppercase tracking-[0.28em] text-gold-soft">
            Pratinjau komponen Counter
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.12} className="text-center">
              <div className="font-display text-4xl font-light text-gold-soft md:text-5xl">
                <Counter value={r.value} suffix={r.suffix} />
              </div>
              <p className="mt-3 text-sm text-paper/60">{r.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pratinjau blur-to-focus + latar terang */}
      <section className="-mx-6 bg-paper-bg px-6 py-[16vh] text-center md:-mx-10 md:px-10">
        <BlurToFocus>
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-gold-deep">
            {profil.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-light text-paper-ink md:text-6xl">
            <Rich segments={profil.judul} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-paper-ink/75">
            {profil.body}
          </p>
        </BlurToFocus>
      </section>
    </main>
  );
}
