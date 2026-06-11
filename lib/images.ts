/**
 * Pemetaan foto per section — sementara placeholder Unsplash (sesuai acuan visual).
 * Fase 4: ganti dengan foto asli Tiska di /public/images (lihat docs/06-asset-inventory.md).
 */

export const images = {
  hero: {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=90",
    alt: "Suasana perayaan pernikahan dengan tata meja elegan",
  },
  sejarah: {
    src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=1400&q=88",
    alt: "Suasana persiapan hidangan katering",
  },
  layanan: [
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=88",
      alt: "Meja perjamuan pernikahan yang megah",
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=88",
      alt: "Suasana acara korporat",
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=88",
      alt: "Sajian prasmanan tertata indah",
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan dalam kemasan praktis",
    },
  ],
  menuRingkas: [
    {
      src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=88",
      alt: "Hidangan khas Indonesia",
    },
    {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=88",
      alt: "Hidangan Asia",
    },
    {
      src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=88",
      alt: "Hidangan Western",
    },
    {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=88",
      alt: "Bingkisan hampers istimewa",
    },
  ],
  /** Banner per kategori menu — key = id kategori di lib/content.ts */
  menuKategori: {
    indonesian: {
      src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1600&q=88",
      alt: "Hidangan khas Indonesia tersaji elegan",
    },
    asian: {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1600&q=88",
      alt: "Sajian Asia yang menggugah selera",
    },
    western: {
      src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1600&q=88",
      alt: "Hidangan Western premium",
    },
    pasta: {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=88",
      alt: "Pasta segar diolah langsung",
    },
    tumpeng: {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=88",
      alt: "Sajian perayaan tradisional",
    },
    hampers: {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=88",
      alt: "Bingkisan hampers istimewa",
    },
  } as Record<string, { src: string; alt: string }>,
  galeri: [
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=88",
      alt: "Resepsi pernikahan dengan tata meja elegan",
      kategori: "Pernikahan",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=88",
      alt: "Meja perjamuan panjang dengan hidangan tertata",
      kategori: "Pernikahan",
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=88",
      alt: "Suasana gathering korporat",
      kategori: "Korporat",
    },
    {
      src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=1200&q=88",
      alt: "Persiapan hidangan di dapur",
      kategori: "Di balik layar",
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=88",
      alt: "Plating hidangan oleh tim kuliner",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=88",
      alt: "Momen perayaan penuh kehangatan",
      kategori: "Perayaan",
    },
    {
      src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan istimewa tersaji",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan dalam kemasan",
      kategori: "Hampers",
    },
    {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=88",
      alt: "Sajian manis penutup",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan Western tersaji hangat",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88",
      alt: "Tim kuliner menyiapkan hidangan",
      kategori: "Di balik layar",
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=88",
      alt: "Perayaan bersama keluarga dan sahabat",
      kategori: "Perayaan",
    },
  ],
  cta: {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2000&q=90",
    alt: "Perayaan penuh kehangatan bersama Tiska",
  },
  profil: [
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=88",
      alt: "Momen hangat pelanggan merayakan kebersamaan",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=88",
      alt: "Meja perjamuan dengan hidangan tertata rapi",
    },
  ],
};
