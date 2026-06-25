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
  /**
   * Foto per-era untuk scrollytelling Sejarah — urut sesuai timeline (lib/content.ts).
   * Placeholder; Fase 4 diganti foto arsip asli Tiska (lihat docs/06).
   */
  sejarahTimeline: [
    {
      src: "/images/layanan/tampah.jpg",
      alt: "Aneka kue tampah tradisional — cikal bakal Tiska dari dapur rumahan",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=90",
      alt: "Resepsi pernikahan besar dengan tata meja elegan",
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=90",
      alt: "Sajian fine dining tertata berkelas — sentuhan seni generasi baru",
    },
    {
      src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1400&q=90",
      alt: "Bingkisan hampers istimewa berpita emas",
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=90",
      alt: "Sajian prasmanan megah tertata indah",
    },
  ],
  layanan: [
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=88",
      alt: "Resepsi pernikahan dengan tata meja elegan",
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=88",
      alt: "Perayaan keluarga penuh kehangatan",
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=88",
      alt: "Suasana acara korporat",
    },
    {
      src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1200&q=88",
      alt: "Kotak makan praktis tertata rapi",
    },
    {
      src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1200&q=88",
      alt: "Bingkisan hampers istimewa berpita emas",
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=88",
      alt: "Sajian prasmanan tertata indah",
    },
    {
      src: "https://images.unsplash.com/photo-1744175331258-f4758acce6ca?auto=format&fit=crop&w=1200&q=88",
      alt: "Stall sate dipanggang di atas bara — live cooking station",
    },
    {
      src: "/images/layanan/everyday-meal.jpg",
      alt: "Nasi kotak lengkap untuk makan harian rumahan dan kantoran",
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=88",
      alt: "Sajian fine dining tertata berkelas",
    },
    {
      src: "/images/layanan/tumpeng.jpg",
      alt: "Nasi tumpeng tersaji di atas daun pisang untuk syukuran",
    },
    {
      src: "/images/layanan/tampah.jpg",
      alt: "Aneka jajan pasar tradisional dalam tampah anyaman bambu",
    },
  ],
  /** Foto kategori menu beranda — key = id kategori (lib/content.ts) */
  menuRingkas: {
    indonesian: {
      src: "https://images.unsplash.com/photo-1562607635-4608ff48a859?auto=format&fit=crop&w=900&q=85",
      alt: "Sate dan aneka hidangan khas Indonesia",
    },
    asian: {
      src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85",
      alt: "Dimsum hangat dalam kukusan bambu",
    },
    western: {
      src: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=85",
      alt: "Steak panggang premium dengan asparagus",
    },
    mediterranean: {
      src: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=900&q=85",
      alt: "Mezze segar khas Mediterania dengan hummus",
    },
    peranakan: {
      src: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=85",
      alt: "Hidangan berempah tersaji di atas daun pisang",
    },
    vegetarian: {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
      alt: "Sajian nabati segar penuh warna",
    },
    hampers: {
      src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=85",
      alt: "Bingkisan istimewa berpita emas",
    },
  } as Record<string, { src: string; alt: string }>,
  /** Banner per kategori menu — key = id kategori di lib/content.ts */
  menuKategori: {
    indonesian: {
      src: "https://images.unsplash.com/photo-1562607635-4608ff48a859?auto=format&fit=crop&w=1600&q=88",
      alt: "Hidangan khas Indonesia tersaji elegan",
    },
    asian: {
      src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=88",
      alt: "Sajian Asia yang menggugah selera",
    },
    western: {
      src: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=1600&q=88",
      alt: "Hidangan Western premium",
    },
    pasta: {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=88",
      alt: "Pasta segar diolah langsung",
    },
    mediterranean: {
      src: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=1600&q=88",
      alt: "Mezze segar khas Mediterania",
    },
    peranakan: {
      src: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1600&q=88",
      alt: "Hidangan Peranakan berempah",
    },
    vegetarian: {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=88",
      alt: "Sajian nabati segar penuh warna",
    },
    tumpeng: {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=88",
      alt: "Sajian perayaan tradisional",
    },
    hampers: {
      src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1600&q=88",
      alt: "Bingkisan hampers istimewa",
    },
  } as Record<string, { src: string; alt: string }>,
  galeri: [
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=88",
      alt: "Resepsi pernikahan dengan tata meja elegan",
      judul: "Resepsi pernikahan yang anggun",
      kategori: "Pernikahan",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=88",
      alt: "Meja perjamuan panjang dengan hidangan tertata",
      judul: "Perjamuan panjang penuh kehangatan",
      kategori: "Pernikahan",
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=88",
      alt: "Suasana gathering korporat",
      judul: "Gathering korporat berkelas",
      kategori: "Korporat",
    },
    {
      src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=1200&q=88",
      alt: "Persiapan hidangan di dapur",
      judul: "Ketelatenan di balik dapur",
      kategori: "Di balik layar",
    },
    {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=88",
      alt: "Plating hidangan oleh tim kuliner",
      judul: "Sentuhan akhir di setiap sajian",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=88",
      alt: "Momen perayaan penuh kehangatan",
      judul: "Momen kebersamaan yang hangat",
      kategori: "Perayaan",
    },
    {
      src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan istimewa tersaji",
      judul: "Prasmanan yang menggugah selera",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan dalam kemasan",
      judul: "Bingkisan istimewa untuk berbagi",
      kategori: "Hampers",
    },
    {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=88",
      alt: "Sajian manis penutup",
      judul: "Manisnya penutup perayaan",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=88",
      alt: "Hidangan Western tersaji hangat",
      judul: "Sajian Western yang elegan",
      kategori: "Buffet",
    },
    {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88",
      alt: "Tim kuliner menyiapkan hidangan",
      judul: "Tim yang menyiapkan dengan hati",
      kategori: "Di balik layar",
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=88",
      alt: "Perayaan bersama keluarga dan sahabat",
      judul: "Merayakan bersama orang terkasih",
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
  /**
   * Foto tim — key = id anggota (lib/content.ts → teamGroups). Default kosong:
   * komponen menampilkan monogram inisial sampai foto asli di-upload via /admin/foto.
   */
  team: {
    bimo: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Bimo Haryo Dewanto" },
    rita: { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Rita Ariyani" },
    ida: { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Ida Raodah" },
    ariz: { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Ariz Rakhma" },
    reza: { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Reza Devyan" },
    ramadan: { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Ramadan Saputra" },
    laksmi: { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Dr. Laksmi Dewayani" },
    sarinah: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Sarinah" },
    sulistiyowati: { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Sulistiyowati" },
    yoga: { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Yoga Gusmantara" },
    asep: { src: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Asep Saepulloh" },
    sukir: { src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&h=1000&q=85", alt: "Sukir Edi Setiyawan" },
  } as Record<string, { src: string; alt: string }>,
};
