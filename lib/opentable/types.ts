/** Tipe data Tiska Open Table — cerminan skema di db/open-table.sql. */

export type GuestStatus = "belum-kirim" | "terkirim" | "dibuka" | "rsvp";
export type RsvpStatus = "confirmed" | "waitlist" | "declined" | "cancelled";
export type ReferralStatus = "baru" | "diproses" | "diundang" | "ditolak";
export type ReferralChannel = "sendiri" | "titip";
export type Kanal = "wa" | "email";

export type Guest = {
  id: string;
  kode: string;
  nama: string;
  jabatan: string;
  perusahaan: string;
  hp: string;
  email: string;
  status: GuestStatus;
  sentAt: string | null;
  sentChannel: Kanal | null;
  openedAt: string | null;
  openCount: number;
  referredBy: string | null;
  catatan: string;
  createdAt: string;
  updatedAt: string;
};

export type GuestInput = {
  nama: string;
  jabatan?: string;
  perusahaan?: string;
  hp?: string;
  email?: string;
  catatan?: string;
  referredBy?: string | null;
};

export type Rsvp = {
  id: string;
  kode: string;
  guestKode: string | null;
  hadir: boolean;
  pax: number;
  nama: string;
  jabatan: string;
  perusahaan: string;
  email: string;
  hp: string;
  preferensi: string[];
  pendamping: string[];
  alergi: string;
  catatan: string;
  status: RsvpStatus;
  checkedInAt: string | null;
  checkedInPax: number | null;
  createdAt: string;
  updatedAt: string;
};

export type RsvpInput = {
  guestKode?: string | null;
  hadir: boolean;
  pax: number;
  nama: string;
  jabatan?: string;
  perusahaan?: string;
  email?: string;
  hp: string;
  preferensi?: string[];
  pendamping?: string[];
  alergi?: string;
  catatan?: string;
};

export type Referral = {
  id: string;
  referrerKode: string | null;
  referrerNama: string;
  nama: string;
  jabatan: string;
  perusahaan: string;
  kontak: string;
  channel: ReferralChannel;
  status: ReferralStatus;
  catatan: string;
  createdAt: string;
};

export type ReferralInput = {
  referrerKode?: string | null;
  referrerNama?: string;
  nama: string;
  jabatan?: string;
  perusahaan?: string;
  kontak: string;
  channel: ReferralChannel;
};

export type Stats = {
  jmlHadir: number;
  totalPax: number;
  jmlWaitlist: number;
  jmlTidakHadir: number;
  jmlCheckin: number;
  sisaKursi: number;
};

export type CheckinResult =
  | { ok: false; reason: "notfound" }
  | { ok: true; sudah: boolean; rsvp: Rsvp };

/** Preferensi makanan yang boleh dipilih. Input publik disaring lawan daftar ini. */
export const PREFERENSI = [
  { value: "halal", label: "Halal" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "tanpa-seafood", label: "Tanpa seafood" },
  { value: "tanpa-kacang", label: "Tanpa kacang" },
  { value: "tanpa-daging-sapi", label: "Tanpa daging sapi" },
  { value: "rendah-gula", label: "Rendah gula" },
] as const;

export const PREFERENSI_VALUES: readonly string[] = PREFERENSI.map((p) => p.value);

export function labelPreferensi(value: string): string {
  return PREFERENSI.find((p) => p.value === value)?.label ?? value;
}

export const GUEST_STATUS_LABEL: Record<GuestStatus, string> = {
  "belum-kirim": "Belum dikirim",
  terkirim: "Terkirim",
  dibuka: "Dibuka",
  rsvp: "Sudah RSVP",
};

export const RSVP_STATUS_LABEL: Record<RsvpStatus, string> = {
  confirmed: "Hadir",
  waitlist: "Daftar tunggu",
  declined: "Tidak hadir",
  cancelled: "Dibatalkan",
};

export const REFERRAL_STATUS_LABEL: Record<ReferralStatus, string> = {
  baru: "Baru",
  diproses: "Diproses",
  diundang: "Sudah diundang",
  ditolak: "Tidak dilanjutkan",
};
