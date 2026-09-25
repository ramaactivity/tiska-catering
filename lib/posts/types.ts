/**
 * Tipe & util untuk "Kabar" — postingan yang dikelola dari /admin.
 * Kategori: kisah perayaan klien (SEO + "customer as spotlight"), promo/paket,
 * momen/campaign, menu musiman, kabar/kegiatan.
 */

export const POST_CATEGORIES = ["kisah", "promo", "campaign", "menu", "kabar"] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

export type PostEn = {
  judul: string;
  ringkasan: string;
  isi: string;
  periode: string;
  ctaLabel: string;
};

export type Post = {
  id: string;
  slug: string;
  kategori: PostCategory;
  judul: string;
  /** Deskripsi singkat untuk kartu & teaser */
  ringkasan: string;
  /** Isi panjang (opsional) untuk halaman detail — paragraf dipisah baris kosong */
  isi: string;
  imageUrl: string;
  imageAlt: string;
  /** mis. "Berlaku sepanjang Juni 2026" — opsional */
  periode: string;
  ctaLabel: string;
  ctaHref: string;
  published: boolean;
  /** Terjemahan Inggris opsional — kabar tampil di /en/news hanya bila diisi. */
  en?: PostEn;
  /** Tampil sebagai sorotan utama di beranda */
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Bentuk minimal dari form admin sebelum dilengkapi id/timestamp. */
export type PostInput = Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">;

export function isPostCategory(value: string): value is PostCategory {
  return (POST_CATEGORIES as readonly string[]).includes(value);
}

/** Ubah judul jadi slug URL yang aman. */
export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "");
  return base || "kabar";
}

/** Versi Inggris sebuah kabar, atau null bila belum diterjemahkan. */
export function postInEnglish(p: Post): Post | null {
  if (!p.en?.judul) return null;
  const { en } = p;
  return {
    ...p,
    judul: en.judul,
    ringkasan: en.ringkasan,
    isi: en.isi,
    periode: en.periode,
    imageAlt: en.judul,
    ctaLabel: en.ctaLabel || "Ask on WhatsApp",
  };
}
