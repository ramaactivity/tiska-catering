import Link from "next/link";
import { NAV_LOGO } from "@/lib/logos-base64";
import { logoutAction } from "@/lib/posts/actions";

/** Topbar backoffice — identitas brand + akses cepat ke situs publik & keluar. */
export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-2/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-5 md:px-8">
        <Link href="/admin" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NAV_LOGO} alt="Tiska" className="h-6 w-auto" />
          <span className="hidden text-[13px] tracking-wide text-paper/55 sm:inline">
            Backoffice
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-[13px] text-paper/65 transition-colors hover:bg-paper/5 hover:text-paper"
          >
            Lihat situs ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-md px-3 py-1.5 text-[13px] text-paper/65 transition-colors hover:bg-paper/5 hover:text-paper"
            >
              Keluar
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
