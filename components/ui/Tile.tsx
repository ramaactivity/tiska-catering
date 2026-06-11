import Image from "next/image";

type TileProps = {
  src: string;
  alt: string;
  judul: string;
  deskripsi: string;
  /** nomor urut kecil di pojok (01, 02, …) — opsional */
  nomor?: string;
  className?: string;
  sizes?: string;
};

/**
 * Tile foto (docs/02): overlay gradien, foto zoom halus saat hover,
 * judul italic + deskripsi di pojok bawah, nomor urut kecil di pojok atas.
 */
export default function Tile({
  src,
  alt,
  judul,
  deskripsi,
  nomor,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: TileProps) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover brightness-[0.92] saturate-[0.9] transition-[transform,filter] duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:brightness-100 group-hover:saturate-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(14,13,10,0.8),transparent_65%)]"
      />
      {nomor && (
        <span className="absolute left-[18px] top-4 z-10 font-display text-[13px] tracking-[0.1em] text-paper/65">
          {nomor}
        </span>
      )}
      <div className="absolute inset-x-7 bottom-[26px] z-10">
        <h3 className="font-accent text-[clamp(23px,2.6vw,38px)] font-normal italic text-paper">
          {judul}
        </h3>
        <p className="mt-1.5 max-w-[320px] text-[13.5px] leading-[1.7] text-[#cbc5b8]">
          {deskripsi}
        </p>
      </div>
    </div>
  );
}
