import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { penutup } from "@/lib/opentable/content";
import { PIC } from "@/lib/opentable/config";
import { waLink, tampilHp } from "@/lib/opentable/kode";

export default function Penutup() {
  const bantuan = waLink(
    PIC.hp,
    `Halo ${PIC.nama}, saya ingin bertanya mengenai undangan Tiska Open Table.`,
  );

  return (
    <footer className="bg-ink-2 px-6 pt-[13vh] pb-16 text-center md:px-10">
      <div className="mx-auto max-w-[600px]">
        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={penutup.judul} />
        </h2>

        <Reveal delay={0.08}>
          <p className="mt-7 text-[15px] leading-[1.85] text-paper/65">{penutup.isi}</p>
          <span aria-hidden className="mx-auto mt-11 block h-px w-14 bg-gold/45" />
          <p className="mt-9 text-[12px] uppercase tracking-[0.2em] text-paper/45">
            {penutup.hormat}
          </p>
          <p className="mt-3 font-accent text-[24px] italic text-gold-soft">{penutup.nama}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-paper/35">
            {penutup.sejak}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[12.5px] leading-[1.8] text-paper/45">
              Pertanyaan seputar acara —{" "}
              <a
                href={bantuan}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-soft transition-colors hover:text-gold-bright"
              >
                {PIC.nama} · {tampilHp(PIC.hp)}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
