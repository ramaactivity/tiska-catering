"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import { seedPosts } from "@/lib/posts/store";
import { seedBanners } from "@/lib/banners/store";
import type { Post } from "@/lib/posts/types";
import type { Banner } from "@/lib/banners/types";

export type SeedState = { ok?: boolean; info?: string; error?: string } | null;

const WA = "https://wa.me/6281383108103";

const POSTS: Post[] = [
  {
    id: "mock-campaign-pernikahan",
    slug: "merayakan-cinta-musim-pernikahan",
    kategori: "campaign",
    judul: "Merayakan Cinta di Musim Pernikahan",
    ringkasan:
      "Sebuah perjalanan rasa untuk hari paling sakral Anda — dirancang bersama, disajikan dengan sepenuh hati.",
    isi: "<p>Setiap pernikahan menyimpan ceritanya sendiri. Musim ini, kami menemani lebih banyak keluarga merayakan momen yang paling dinanti, dengan hidangan yang lahir dari percakapan panjang tentang kenangan, selera, dan harapan.</p><h2>Yang kami siapkan untuk Anda</h2><ul><li>Konsultasi menu personal bersama tim kuliner kami</li><li>Sesi cicip rasa sebelum hari acara</li><li>Penataan prasmanan & live cooking yang anggun</li><li>Pendampingan penuh dari persiapan hingga acara usai</li></ul><blockquote>Bukan tentang seberapa megah, melainkan seberapa berkesan.</blockquote><p>Mari rancang perjalanan rasa untuk hari istimewa Anda.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Tata meja pernikahan yang anggun dengan rangkaian bunga",
    periode: "Musim pernikahan 2026",
    ctaLabel: "Rencanakan pernikahan Anda",
    ctaHref: WA,
    published: true,
    featured: true,
    createdAt: "2026-06-19T09:00:00.000Z",
    updatedAt: "2026-06-19T09:00:00.000Z",
  },
  {
    id: "mock-kabar-event",
    slug: "catatan-dari-resepsi-bogor",
    kategori: "kabar",
    judul: "Catatan dari Resepsi di Bogor",
    ringkasan:
      "Sebuah sore yang hangat, ratusan tamu, dan meja panjang yang tak pernah sepi. Terima kasih telah mempercayakan harinya kepada kami.",
    isi: "<p>Akhir pekan lalu, kami berkesempatan menemani sebuah resepsi pernikahan di Bogor. Di bawah langit sore yang cerah, ratusan tamu berkumpul, dan dapur kami bekerja sejak fajar untuk memastikan setiap sajian hangat saat tiba di meja.</p><h2>Yang tersaji hari itu</h2><ul><li>Stasiun nasi liwet & aneka lauk khas Sunda</li><li>Live cooking sate dan bakmi</li><li>Sudut hidangan penutup tradisional</li></ul><p>Momen seperti inilah yang membuat kami jatuh cinta pada pekerjaan ini.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Meja perjamuan panjang dengan hidangan tertata megah",
    periode: "",
    ctaLabel: "Tanya via WhatsApp",
    ctaHref: WA,
    published: true,
    featured: false,
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-06-15T09:00:00.000Z",
  },
  {
    id: "mock-menu-musiman",
    slug: "sentuhan-nusantara-musim-ini",
    kategori: "menu",
    judul: "Sentuhan Nusantara Musim Ini",
    ringkasan:
      "Tujuh hidangan baru yang merayakan kekayaan rempah Nusantara, hadir untuk acara semi-formal Anda.",
    isi: "<p>Musim ini kami menambahkan deretan hidangan yang merayakan rempah dari berbagai penjuru Nusantara, diolah dengan teknik yang menjaga kesegaran dan aromanya.</p><h2>Beberapa yang patut dicoba</h2><ul><li>Gulai nangka muda dengan santan ringan</li><li>Ayam bakar bumbu rujak</li><li>Pepes ikan kemangi</li><li>Tumis bunga pepaya</li></ul><p>Setiap menu dapat kami sesuaikan dengan tema dan jumlah tamu acara Anda.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1562607635-4608ff48a859?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Aneka hidangan khas Indonesia tersaji elegan",
    periode: "Tersedia mulai Juni 2026",
    ctaLabel: "Lihat menu lengkap",
    ctaHref: WA,
    published: true,
    featured: false,
    createdAt: "2026-06-12T09:00:00.000Z",
    updatedAt: "2026-06-12T09:00:00.000Z",
  },
  {
    id: "mock-promo-syukuran",
    slug: "paket-syukuran-bulan-ini",
    kategori: "promo",
    judul: "Paket Syukuran Bulan Ini",
    ringkasan:
      "Penawaran istimewa untuk tasyakuran dan acara keluarga, lengkap dengan tumpeng dan prasmanan pilihan.",
    isi: "<p>Rayakan rasa syukur bersama orang-orang terdekat. Bulan ini kami menyiapkan paket khusus untuk acara tasyakuran keluarga, dengan sentuhan yang hangat dan harga yang bersahabat.</p><h2>Termasuk dalam paket</h2><ul><li>Tumpeng lengkap dengan lauk pilihan</li><li>Tiga menu utama & dua hidangan penutup</li><li>Peralatan saji dan pramusaji</li></ul><p>Tempat terbatas setiap bulannya, sampaikan tanggal acara Anda lebih awal.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Prasmanan tertata indah untuk acara syukuran",
    periode: "Berlaku sepanjang Juni 2026",
    ctaLabel: "Tanya Paket Syukuran",
    ctaHref: WA,
    published: true,
    featured: false,
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-10T09:00:00.000Z",
  },
];

const BANNERS: Banner[] = [
  {
    id: "mock-banner-pernikahan",
    label: "Musim Pernikahan 2026",
    judul: "Merayakan Cinta di Musim Pernikahan",
    subjudul:
      "Perjalanan rasa untuk hari paling sakral Anda, dirancang bersama dan disajikan dengan sepenuh hati.",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Tata meja pernikahan yang anggun",
    ctaLabel: "Rencanakan pernikahan",
    ctaHref: "/kabar/merayakan-cinta-musim-pernikahan",
    urutan: 1,
    aktif: true,
    createdAt: "2026-06-20T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
  },
  {
    id: "mock-banner-syukuran",
    label: "Promo Juni",
    judul: "Paket Syukuran Bulan Ini",
    subjudul:
      "Penawaran istimewa untuk tasyakuran keluarga, lengkap dengan tumpeng dan prasmanan pilihan.",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Prasmanan tertata indah",
    ctaLabel: "Tanya paket",
    ctaHref: WA,
    urutan: 2,
    aktif: true,
    createdAt: "2026-06-18T09:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z",
  },
  {
    id: "mock-banner-menu",
    label: "Menu Musiman",
    judul: "Sentuhan Nusantara Musim Ini",
    subjudul: "Tujuh hidangan baru yang merayakan kekayaan rempah Nusantara.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Aneka hidangan tersaji",
    ctaLabel: "Lihat menu",
    ctaHref: "/menu",
    urutan: 3,
    aktif: true,
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-06-15T09:00:00.000Z",
  },
];

export async function seedExamplesAction(
  _prev: SeedState,
  _formData: FormData,
): Promise<SeedState> {
  try {
    await requireSession();
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return {
        error:
          "Penyimpanan Blob produksi belum aktif (BLOB_READ_WRITE_TOKEN tidak ditemukan). Buka Vercel → Storage → Tiska-News → Connect ke project, atau Settings → Environment Variables, lalu redeploy.",
      };
    }
    const addedPosts = await seedPosts(POSTS);
    const addedBanners = await seedBanners(BANNERS);
    revalidatePath("/");
    revalidatePath("/kabar");
    revalidatePath("/admin");
    revalidatePath("/admin/banners");
    return {
      ok: true,
      info: `${addedPosts} kabar & ${addedBanners} banner ditambahkan.`,
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}
