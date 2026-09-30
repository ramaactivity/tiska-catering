import * as id from "./content";
import * as en from "./content-en";
import { areas, services } from "./landing";

export type Lang = "id" | "en";

const EN: typeof id = { ...id, ...en };

/** Konten situs sesuai bahasa (ID = lib/content.ts, EN = lib/content-en.ts). */
export const t = (lang: Lang): typeof id => (lang === "en" ? EN : id);

// ─── Pemetaan URL ID ↔ EN ───────────────────────────────────────────────────

const SEGMENT: Record<string, string> = {
  layanan: "services",
  area: "areas",
  galeri: "gallery",
  kabar: "news",
  menu: "menu",
  tentang: "about",
};
const SEGMENT_ID = Object.fromEntries(Object.entries(SEGMENT).map(([a, b]) => [b, a]));

/** Terjemahkan path ke pasangan bahasanya, mis. /layanan/katering-korporat ↔ /en/services/corporate-catering. */
export function switchPath(path: string, to: Lang): string {
  const [pathname, hash = ""] = path.split("#");
  const parts = pathname.split("/").filter(Boolean);
  const fromEn = parts[0] === "en";
  if (fromEn) parts.shift();
  if ((to === "en") === fromEn) return path;

  const [seg, slug, ...rest] = parts;
  const map = to === "en" ? SEGMENT : SEGMENT_ID;
  const out = seg ? [map[seg] ?? seg] : [];
  if (slug) {
    const from: Lang = to === "en" ? "id" : "en";
    const isService = seg === (from === "id" ? "layanan" : "services");
    const l = (isService ? services : areas).find((x) => x.slug[from] === slug);
    out.push(l ? l.slug[to] : slug, ...rest);
  }
  const p = (to === "en" ? ["en", ...out] : out).join("/");
  return `/${p}${hash ? `#${hash}` : ""}`;
}

/** canonical + hreflang untuk halaman yang punya pasangan ID & EN. */
export function alternates(idPath: string, lang: Lang) {
  const enPath = switchPath(idPath, "en");
  return {
    canonical: lang === "en" ? enPath : idPath,
    languages: { id: idPath, en: enPath, "x-default": idPath },
  };
}
