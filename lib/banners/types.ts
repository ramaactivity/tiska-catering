/**
 * Tipe Banner untuk Hero/Campaign Carousel di beranda.
 * Dikelola dari /admin/banners, disimpan native (Vercel Blob / fs fallback).
 */

/** Terjemahan Inggris opsional. Tanpa ini, banner tidak tampil di /en. */
export type BannerEn = {
  label: string;
  judul: string;
  subjudul: string;
  ctaLabel: string;
};

export type Banner = {
  id: string;
  /** Label kecil di atas judul, mis. "Promo Juni" (opsional) */
  label: string;
  judul: string;
  subjudul: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  /**
   * Versi Inggris. Mengikuti pola Kabar: banner hanya muncul di /en bila
   * judul Inggrisnya diisi — lebih baik carousel tanpa satu slide daripada
   * halaman Inggris yang menampilkan teks Indonesia.
   */
  en?: BannerEn;
  /** Urutan tampil (kecil = duluan) */
  urutan: number;
  aktif: boolean;
  /** Jadwal tampil — tanggal "YYYY-MM-DD" zona WIB. Kosong = tanpa batas. */
  mulaiAt?: string;
  selesaiAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type BannerInput = Omit<Banner, "id" | "createdAt" | "updatedAt">;
