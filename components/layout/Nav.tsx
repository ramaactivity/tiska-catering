"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchPath, t, type Lang } from "@/lib/i18n";
import { NAV_LOGO } from "@/lib/logos-base64";
import SocialLinks, { WhatsAppIcon } from "@/components/ui/SocialLinks";

/**
 * Nav floating pill (docs/02 & acuan visual):
 * transparan di atas, jadi kaca buram setelah scroll > 80px.
 * Mobile: menu hamburger (panel dropdown).
 */
export default function Nav({ lang = "id" }: { lang?: Lang }) {
  const { nav, ui } = t(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-100 w-[calc(100%-32px)] max-w-[1280px] -translate-x-1/2 rounded-full border transition-[top,padding,background-color,border-color] duration-500 md:w-[calc(100%-48px)] ${
        scrolled || open
          ? "top-4 border-line bg-[rgba(20,18,14,0.78)] py-3 pl-7 pr-4 backdrop-blur-md"
          : "top-6 border-transparent py-1 pl-3 pr-2"
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link href={lang === "en" ? "/en" : "/"} aria-label={ui.navBeranda} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NAV_LOGO} alt="Tiska Catering Service" className="h-[34px] w-auto" />
        </Link>

        <div className="hidden items-center gap-[30px] md:flex">
          <ul className="flex items-center gap-[30px]">
            {nav.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-paper transition-colors duration-300 hover:text-gold-soft"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialLinks className="border-l border-line pl-6" />
          <LangSwitch lang={lang} label={ui.bahasa} />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.navWhatsapp}
            className="group hidden items-center gap-2 rounded-full border border-gold/70 px-6 py-[11px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-300 hover:border-gold hover:text-gold-bright active:scale-[0.98] sm:inline-flex"
          >
            {nav.cta.label}
            <span aria-hidden className="transition-transform duration-300 group-hover:scale-110">
              <WhatsAppIcon size={15} />
            </span>
          </a>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? ui.navTutup : ui.navBuka}
            aria-expanded={open}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-colors hover:border-gold/70 active:scale-95 md:hidden"
          >
            <span aria-hidden className="relative block h-[12px] w-[18px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Panel menu mobile */}
      <div
        className={`absolute left-0 right-0 top-full mt-3 origin-top overflow-hidden rounded-3xl border border-line bg-[rgba(18,16,12,0.96)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {nav.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-display text-[22px] font-light text-paper transition-colors hover:bg-paper/5 hover:text-gold-soft"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
          <SocialLinks size={18} />
          <LangSwitch lang={lang} label={ui.bahasa} />
          <a
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors hover:border-gold hover:text-gold-bright active:scale-[0.98]"
          >
            {nav.cta.label}
            <WhatsAppIcon size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}

/** Tombol ganti bahasa — menuju halaman padanan di bahasa lain. */
function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname();
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1.5 text-[11.5px] tracking-[0.14em]">
      {(["id", "en"] as const).map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden className="text-paper/30">/</span>}
          <Link
            href={switchPath(pathname, l)}
            hrefLang={l}
            aria-current={l === lang ? "true" : undefined}
            className={l === lang ? "text-gold-soft" : "text-paper/55 transition-colors hover:text-paper"}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
