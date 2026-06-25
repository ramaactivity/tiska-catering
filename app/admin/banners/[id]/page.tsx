import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getBannerById } from "@/lib/banners/store";
import BannerForm from "@/components/admin/BannerForm";
import BannerDeleteButton from "@/components/admin/BannerDeleteButton";

export const metadata: Metadata = { title: "Edit banner — Backoffice Tiska" };
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditBannerPage({ params }: Params) {
  await requireSession();
  const { id } = await params;
  const banner = await getBannerById(id);
  if (!banner) notFound();

  return (
    <>
      <Link href="/admin/banners" className="text-[13px] text-ad-muted transition-colors hover:text-ad-accent">
          ← Banner
        </Link>
        <div className="mb-6 mt-3 flex items-center justify-between gap-4">
          <h1 className="text-[15px] font-medium text-ad-subtle">Edit banner</h1>
          <BannerDeleteButton id={banner.id} judul={banner.judul} />
        </div>
        <BannerForm banner={banner} />
    </>
  );
}
