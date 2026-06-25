/**
 * Tipe Banner untuk Hero/Campaign Carousel di beranda.
 * Dikelola dari /admin/banners, disimpan native (Vercel Blob / fs fallback).
 */

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
