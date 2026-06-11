import type { RichText } from "@/lib/content";

type RichTitleProps = {
  segments: RichText;
  /** Warna aksen italic: text-gold-soft (latar gelap) / text-gold-deep (latar terang) */
  accentClass?: string;
};

/** Render judul RichText; bagian italic memakai Instrument Serif warna emas. */
export default function RichTitle({
  segments,
  accentClass = "text-gold-soft",
}: RichTitleProps) {
  return (
    <>
      {segments.map((s, i) =>
        s.italic ? (
          <em key={i} className={`font-accent italic ${accentClass}`}>
            {s.text}
          </em>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}
