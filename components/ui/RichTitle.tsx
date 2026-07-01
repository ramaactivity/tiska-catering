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
      {segments.map((s, i) => (
        <span key={i} className="contents">
          {s.br ? <span className="block h-0 w-full" /> : null}
          {s.italic ? (
            <em className={`font-accent italic ${accentClass}`}>{s.text}</em>
          ) : (
            <span>{s.text}</span>
          )}
        </span>
      ))}
    </>
  );
}
