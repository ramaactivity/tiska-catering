type EyebrowProps = {
  children: React.ReactNode;
  /** dark = di latar gelap (teks gold-soft), light = di latar terang (teks gold-deep) */
  tone?: "dark" | "light";
  /** garis dekoratif: kiri saja, atau kiri-kanan (untuk teks center) */
  lines?: "left" | "both";
  className?: string;
};

/** Label kecil uppercase + garis emas pendek (pola khas Tiska, docs/02). */
export default function Eyebrow({
  children,
  tone = "dark",
  lines = "left",
  className = "",
}: EyebrowProps) {
  const text = tone === "dark" ? "text-gold-soft" : "text-gold-deep";
  const line = tone === "dark" ? "bg-gold" : "bg-gold-deep";

  return (
    <p
      className={`flex items-center gap-3.5 text-[11px] font-normal uppercase tracking-[0.28em] ${text} ${className}`}
    >
      <span aria-hidden className={`h-px w-10 ${line}`} />
      <span>{children}</span>
      {lines === "both" && <span aria-hidden className={`h-px w-10 ${line}`} />}
    </p>
  );
}
