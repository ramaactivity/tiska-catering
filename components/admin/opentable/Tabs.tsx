"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/open-table", label: "Daftar Undangan", exact: true },
  { href: "/admin/open-table/rsvp", label: "RSVP Masuk", exact: false },
  { href: "/admin/open-table/referral", label: "Referral", exact: false },
  { href: "/admin/open-table/checkin", label: "Check-in", exact: false },
];

export default function Tabs() {
  const path = usePathname();
  return (
    <nav className="-mx-1 mb-8 flex gap-1 overflow-x-auto border-b border-ad-border pb-px">
      {TABS.map((t) => {
        const active = t.exact ? path === t.href : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`relative shrink-0 rounded-t-lg px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
              active
                ? "text-ad-accent"
                : "text-ad-muted hover:bg-ad-accent-weak hover:text-ad-text"
            }`}
          >
            {t.label}
            {active && (
              <span aria-hidden className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-ad-accent" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
