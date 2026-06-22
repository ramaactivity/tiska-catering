"use client";

import { createContext, useContext, useState } from "react";

export type AdminTheme = "light" | "dark";

const ThemeCtx = createContext<{
  theme: AdminTheme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export const useAdminTheme = () => useContext(ThemeCtx);

/** Pembungkus kanvas backoffice + state tema (terang/gelap), persist via cookie. */
export default function AdminThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: AdminTheme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<AdminTheme>(initialTheme);

  const toggle = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.cookie = `admin_theme=${next}; path=/; max-age=31536000; samesite=lax`;
      return next;
    });

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div
        className={`admin-theme ${theme === "dark" ? "dark" : ""} min-h-svh bg-ad-bg font-sans font-normal text-ad-text antialiased`}
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
