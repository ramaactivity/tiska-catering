import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getAllBanners, bannerStatus } from "@/lib/banners/store";
import { formatTanggal } from "@/components/admin/ui";
import BannerDeleteButton from "@/components/admin/BannerDeleteButton";
import { seedBannersAction } from "@/lib/banners/actions";

export const metadata: Metadata = { title: "Banner — Backoffice Tiska" };
export const dynamic = "force-dynamic";

export default async function BannersPage() {
  await requireSession();
  const banners = await getAllBanners();

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[clamp(26px,3vw,34px)] font-light tracking-tight text-ad-text">Banner</h1>
            <p className="mt-1 text-[14px] text-ad-muted">
              Banner besar yang berputar (carousel) di bagian atas beranda.
            </p>
          </div>
          {banners.length > 0 && (
            <Link
              href="/admin/banners/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-ad-btn px-4 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98]"
            >
              <span className="text-[15px] leading-none">+</span> Tambah banner
            </Link>
          )}
        </div>

        {banners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center shadow-[0_1px_2px_var(--ad-shadow)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ad-accent-weak text-ad-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 14l4.5-4 4 3.5L16 8l5 4.5" />
                <circle cx="9" cy="10" r="1.2" />
              </svg>
            </div>
            <h2 className="font-display text-[22px] font-light text-ad-text">Belum ada banner</h2>
            <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-[1.7] text-ad-muted">
              Tambahkan banner campaign atau promo. Beberapa banner akan berputar
              otomatis sebagai carousel besar di beranda.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/admin/banners/new"
                className="inline-flex items-center gap-2 rounded-xl bg-ad-btn px-5 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98]"
              >
                Tambah banner pertama
              </Link>
              <form action={seedBannersAction}>
                <button
                  type="submit"
                  className="rounded-xl border border-ad-border bg-ad-input px-5 py-2.5 text-[13px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent active:scale-[0.98]"
                >
                  Mulai dari contoh
                </button>
              </form>
            </div>
          </div>
        ) : (
          <ul className="grid gap-3">
            {banners.map((b) => {
              const st = bannerStatus(b);
              const range =
                b.mulaiAt || b.selesaiAt
                  ? `${b.mulaiAt ? formatTanggal(b.mulaiAt) : "…"} – ${b.selesaiAt ? formatTanggal(b.selesaiAt) : "…"}`
                  : null;
              return (
              <li
                key={b.id}
                className="flex items-center gap-4 rounded-2xl bg-ad-panel p-3 shadow-[0_1px_2px_var(--ad-shadow)] ring-1 ring-inset ring-ad-border/70 transition-all duration-300 hover:shadow-[0_12px_28px_-16px_var(--ad-shadow)] hover:ring-ad-border-strong"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.imageUrl} alt="" className="h-14 w-24 shrink-0 rounded-xl object-cover ring-1 ring-ad-border" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ad-text">{b.judul}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                    <span className="text-ad-subtle">Urutan {b.urutan}</span>
                    {st === "live" && <span className="font-medium" style={{ color: "#4f9a8f" }}>● Tayang</span>}
                    {st === "scheduled" && <span className="font-medium text-ad-accent">◷ Terjadwal{b.mulaiAt ? ` · mulai ${formatTanggal(b.mulaiAt)}` : ""}</span>}
                    {st === "ended" && <span className="text-ad-subtle">○ Berakhir{b.selesaiAt ? ` ${formatTanggal(b.selesaiAt)}` : ""}</span>}
                    {st === "off" && <span className="text-ad-subtle">○ Nonaktif</span>}
                    {range && st !== "scheduled" && st !== "ended" && (
                      <span className="text-ad-subtle">· {range}</span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <Link
                    href={`/admin/banners/${b.id}`}
                    className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-ad-accent transition-colors hover:bg-ad-bg"
                  >
                    Edit
                  </Link>
                  <BannerDeleteButton id={b.id} judul={b.judul} />
                </div>
              </li>
              );
            })}
          </ul>
        )}
    </>
  );
}
