import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import BannerForm from "@/components/admin/BannerForm";

export const metadata: Metadata = { title: "Banner baru — Backoffice Tiska" };

type Search = Record<string, string | string[] | undefined>;

export default async function NewBannerPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  await requireSession();
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const defaults = {
    judul: one(sp.judul),
    label: one(sp.label),
    mulaiAt: one(sp.mulai),
    selesaiAt: one(sp.selesai),
  };
  return (
    <>
      <Link href="/admin/banners" className="text-[13px] text-ad-muted transition-colors hover:text-ad-accent">
          ← Banner
        </Link>
        <h1 className="mb-6 mt-3 text-[15px] font-medium text-ad-subtle">Banner baru</h1>
        <BannerForm defaults={defaults} />
    </>
  );
}
