import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { pembuka } from "@/lib/opentable/content";

export default function Pembuka() {
  return (
    <section className="bg-ink px-6 pt-[16vh] pb-[12vh] md:px-10">
      <div className="mx-auto max-w-[660px] text-center">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {pembuka.eyebrow}
          </Eyebrow>
        </Reveal>

        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-8 font-display text-[clamp(30px,5.5vw,52px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={pembuka.judul} />
        </h2>

        <div className="mt-10 space-y-6">
          {pembuka.paragraf.map((p, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p className="text-[clamp(15px,1.8vw,17px)] leading-[1.9] text-paper/75">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <span aria-hidden className="mx-auto mt-12 block h-px w-14 bg-gold/45" />
          <p className="mt-7 font-accent text-[19px] italic text-gold-soft">
            {pembuka.tandaTangan.nama}
          </p>
          <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.2em] text-paper/45">
            {pembuka.tandaTangan.jabatan}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
