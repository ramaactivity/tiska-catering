import { filosofi } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";

/** Filosofi: color block emas penuh, pull quote tenang (docs/04 #6). */
export default function Filosofi() {
  return (
    <section className="bg-gold-deep px-6 py-[20vh] md:px-10">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal>
          <blockquote className="font-display text-[clamp(32px,5.5vw,88px)] font-light leading-[1.04] tracking-[-0.025em] text-ink">
            {filosofi.quote.map((s, i) =>
              s.italic ? (
                <em key={i} className="font-accent italic">
                  {s.text}
                </em>
              ) : (
                <span key={i}>{s.text}</span>
              ),
            )}
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-[34px] max-w-[520px] text-[14.5px] leading-[1.8] text-ink/70">
            {filosofi.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
