/**
 * Timing bersama loader pembuka ↔ entrance hero, agar perpindahannya
 * terkoreografi mulus (teks hero naik bersamaan tirai terbuka).
 * Satuan detik.
 */
export const LOADER_TIMING = {
  /** konten loader mulai memudar */
  contentFade: 2.0,
  /** tirai mulai terangkat */
  curtain: 2.25,
  /** durasi tirai */
  curtainDuration: 1.0,
  /** loader di-unmount */
  total: 3.4,
  /** teks hero mulai masuk (saat tirai ±separuh terbuka) */
  heroDelay: 2.55,
};

const KEY = "tiska-loader-played";

/** Loader hanya tampil sekali per sesi browser. */
export function loaderWillPlay(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !window.sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

export function markLoaderPlayed() {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode dsb. — abaikan */
  }
}
