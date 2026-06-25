import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import BannerForm from "@/components/admin/BannerForm";

export const metadata: Metadata = { title: "Banner baru — Backoffice Tiska" };

export default async function NewBannerPage() {
  await requireSession();
  return (
    <>
      <Link href="/admin/banners" className="text-[13px] text-ad-muted transition-colors hover:text-ad-accent">
          ← Banner
        </Link>
        <h1 className="mb-6 mt-3 text-[15px] font-medium text-ad-subtle">Banner baru</h1>
        <BannerForm />
    </>
  );
}
