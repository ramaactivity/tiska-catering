"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/content";
import { NAV_LOGO } from "@/lib/logos-base64";
import SocialLinks, { WhatsAppIcon } from "@/components/ui/SocialLinks";

/**
 * Nav floating pill (docs/02 & acuan visual):
 * transparan di atas, jadi kaca buram (backdrop-blur) setelah scroll > 80px.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-100 w-[calc(100%-32px)] max-w-[1280px] -translate-x-1/2 rounded-full border transition-[top,padding,background-color,border-color] duration-500 md:w-[calc(100%-48px)] ${
        scrolled
          ? "top-4 border-line bg-[rgba(20,18,14,0.78)] py-3 pl-7 pr-4 backdrop-blur-md"
          : "top-6 border-transparent py-1 pl-3 pr-2"
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Beranda Tiska Catering">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NAV_LOGO}
            alt="Tiska Catering Service"
            className="h-[34px] w-auto"
          />
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
        </div>

        <a
          href={nav.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi Tiska Catering via WhatsApp"
          className="group inline-flex items-center gap-2 rounded-full border border-gold/70 px-6 py-[11px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-300 hover:border-gold hover:text-gold-bright"
        >
          {nav.cta.label}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <WhatsAppIcon size={15} />
          </span>
        </a>
      </nav>
    </header>
  );
}
