"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LOGO } from "@/lib/logos-base64";
import { logoutAction } from "@/lib/posts/actions";
import ThemeToggle from "@/components/admin/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  desc: string;
  match: (p: string) => boolean;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  {
    href: "/admin",
    label: "Kabar",
    desc: "Promo & artikel",
    match: (p) => p === "/admin" || p.startsWith("/admin/posts"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h11a1 1 0 0 1 1 1v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5Z" />
        <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2" />
        <path d="M7 8.5h6M7 12h6M7 15.5h4" />
      </svg>
    ),
  },
  {
    href: "/admin/banners",
    label: "Banner",
    desc: "Sorotan beranda",
    match: (p) => p.startsWith("/admin/banners"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 14l4.5-4 4 3.5L16 8l5 4.5" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    href: "/admin/foto",
    label: "Foto",
    desc: "Gambar tiap bagian",
    match: (p) => p.startsWith("/admin/foto"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z" />
        <circle cx="12" cy="13" r="3.4" />
      </svg>
    ),
  },
  {
    href: "/admin/galeri",
    label: "Galeri",
    desc: "Portofolio acara",
    match: (p) => p.startsWith("/admin/galeri"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
      </svg>
    ),
  },
  {
    href: "/admin/hari-spesial",
    label: "Hari Spesial",
    desc: "Kalender & reminder",
    match: (p) => p.startsWith("/admin/hari-spesial"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4" />
        <path d="M12 12.5l.9 1.9 2 .3-1.45 1.4.35 2L12 17.1l-1.8.95.35-2L9.1 14.7l2-.3z" />
      </svg>
    ),
  },
];

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <span className="flex items-center rounded-xl bg-ink px-2.5 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NAV_LOGO} alt="Tiska" className="h-5 w-auto" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold tracking-tight text-ad-text">Backoffice</span>
        <span className="text-[11px] text-ad-subtle">Tiska Catering</span>
      </span>
    </Link>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Halaman login berdiri sendiri (tanpa shell).
  if (path === "/admin/login") return <>{children}</>;

  const renderSidebar = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col p-4">
      <div className="px-2 py-2.5">
        <Brand />
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ad-subtle">
          Kelola
        </p>
        {NAV.map((t) => {
          const active = t.match(path);
          return (
            <Link
              key={t.href}
              href={t.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                active
                  ? "bg-ad-accent-weak text-ad-accent"
                  : "text-ad-muted hover:bg-ad-accent-weak hover:text-ad-text"
              }`}
            >
              <span className={`size-5 shrink-0 ${active ? "text-ad-accent" : "text-ad-subtle group-hover:text-ad-text"}`}>
                {t.icon}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13.5px] font-medium">{t.label}</span>
                <span className={`text-[11px] ${active ? "text-ad-accent/70" : "text-ad-subtle"}`}>
                  {t.desc}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-ad-border pt-3">
        <div className="flex items-center justify-between rounded-xl px-3 py-1.5">
          <span className="text-[12.5px] text-ad-muted">Tema tampilan</span>
          <ThemeToggle />
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-ad-muted transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
        >
          <svg className="size-[17px] shrink-0 text-ad-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 5h5v5M19 5l-8 8M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
          </svg>
          Lihat situs
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-ad-muted transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
          >
            <svg className="size-[17px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 17l5-5-5-5M20 12H9M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
            </svg>
            Keluar
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-svh w-[248px] shrink-0 border-r border-ad-border bg-ad-panel lg:block">
        {renderSidebar()}
      </aside>

      {/* Topbar (mobile) */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ad-border bg-ad-panel/90 px-4 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="flex size-9 items-center justify-center rounded-lg text-ad-muted transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Brand />
        <ThemeToggle />
      </header>

      {/* Drawer (mobile) */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[270px] border-r border-ad-border bg-ad-panel shadow-2xl">
            {renderSidebar(() => setOpen(false))}
          </aside>
        </div>
      )}

      {/* Konten */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1560px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
