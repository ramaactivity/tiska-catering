import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** dark = di latar gelap, light = di latar terang */
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
};

/**
 * Tombol pill (docs/02): border 1px, isi transparan;
 * hover → latar emas naik dari bawah, teks jadi gelap, panah geser kanan.
 */
export default function Button({
  href,
  children,
  tone = "dark",
  size = "md",
  className = "",
}: ButtonProps) {
  const color =
    tone === "dark"
      ? "border-gold/70 text-gold-soft"
      : "border-gold-deep/70 text-gold-deep";
  const pad =
    size === "md" ? "px-8 py-[14px] text-[12.5px]" : "px-6 py-[11px] text-[12px]";

  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border font-normal uppercase tracking-[0.18em] transition-colors duration-500 hover:text-ink ${color} ${pad} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
