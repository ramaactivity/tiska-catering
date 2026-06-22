"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Kabar", match: (p: string) => p === "/admin" || p.startsWith("/admin/posts") },
  { href: "/admin/banners", label: "Banner", match: (p: string) => p.startsWith("/admin/banners") },
];

/** Tab navigasi antar bagian backoffice (Kabar / Banner). */
export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {TABS.map((t) => {
        const active = t.match(path);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-[var(--ad-accent-weak)] text-ad-accent"
                : "text-ad-muted hover:bg-[var(--ad-accent-weak)] hover:text-ad-text"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
