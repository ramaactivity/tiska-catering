/**
 * Kunci scroll global saat modal terbuka (mis. cropper foto /admin).
 * Tanpa ini, Lenis tetap menggulir latar saat drag/zoom → latar bergerak di
 * balik blur modal → tampak "kedip-kedip". LenisProvider mendaftarkan instance-
 * nya via setLenis(); modal memanggil lockScroll()/unlockScroll().
 */

type LenisLike = { stop: () => void; start: () => void } | null;

let lenis: LenisLike = null;
let locks = 0; // dukung beberapa modal bertumpuk

export function setLenis(instance: LenisLike): void {
  lenis = instance;
}

export function lockScroll(): void {
  locks += 1;
  if (locks > 1) return;
  lenis?.stop();
  if (typeof document !== "undefined") document.body.style.overflow = "hidden";
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  lenis?.start();
  if (typeof document !== "undefined") document.body.style.overflow = "";
}
