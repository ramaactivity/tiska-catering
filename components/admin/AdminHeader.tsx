import Link from "next/link";
import { NAV_LOGO } from "@/lib/logos-base64";
import { logoutAction } from "@/lib/posts/actions";
import ThemeToggle from "@/components/admin/ThemeToggle";

/** Topbar backoffice — identitas brand + tema, akses situs publik & keluar. */
export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ad-border bg-ad-panel/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex items-center rounded-lg bg-ink px-2.5 py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={NAV_LOGO} alt="Tiska" className="h-5 w-auto" />
          </span>
          <span className="hidden text-[13px] font-medium text-ad-muted sm:inline">
            Backoffice
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-[13px] text-ad-muted transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
          >
            Lihat situs ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg px-3 py-1.5 text-[13px] text-ad-muted transition-colors hover:bg-ad-accent-weak hover:text-ad-text"
            >
              Keluar
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
