"use client";

import { useAdminTheme } from "@/components/admin/AdminThemeProvider";

/** Tombol ganti tema terang/gelap di topbar. */
export default function ThemeToggle() {
  const { theme, toggle } = useAdminTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
      title={dark ? "Tema terang" : "Tema gelap"}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ad-muted transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
