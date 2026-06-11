import Image from "next/image";
import { profil } from "@/lib/content";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/** Profil: latar terang, heading word-by-word + 2 foto blur-to-focus. */
export default function Profil() {
  return (
    <section id="profil" className="bg-paper-bg px-6 py-[18vh] md:px-10">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <Eyebrow tone="light" className="mb-7">
              {profil.eyebrow}
            </Eyebrow>
          </Reveal>
          <h2 className="font-display text-[clamp(30px,4.2vw,60px)] font-light leading-[1.1] text-paper-ink">
            <WordReveal segments={profil.judul} accentClass="text-gold-deep" />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[470px] text-[16.5px] leading-[1.9] text-paper-ink/80">
              {profil.body}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-6">
          {images.profil.map((foto, i) => (
            <BlurToFocus
              key={foto.src}
              delay={i * 0.15}
              className={i === 1 ? "mt-11" : ""}
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-lg">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </BlurToFocus>
          ))}
        </div>
      </div>
    </section>
  );
}
