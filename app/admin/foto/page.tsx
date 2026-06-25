import type { Metadata } from "next";
import { requireSession } from "@/lib/auth";
import { getSiteImages, readOverrides, SITE_IMAGE_GROUPS } from "@/lib/site-images";
import FotoTabs from "@/components/admin/FotoTabs";

export const metadata: Metadata = { title: "Foto Website — Backoffice Tiska" };
export const dynamic = "force-dynamic";

export default async function FotoPage() {
  await requireSession();
  const [si, ov] = await Promise.all([getSiteImages(), readOverrides()]);

  const groups = SITE_IMAGE_GROUPS.map((g) => ({
    group: g.group,
    slots: g.slots.map((s) => ({
      key: s.key,
      label: s.label,
      ratio: s.ratio,
      ratioLabel: s.ratioLabel,
      size: s.size,
      currentSrc: s.srcOf(si),
      overridden: !!ov[s.key],
    })),
  }));

  return (
    <>
      <div className="mb-8 max-w-[640px]">
        <h1 className="font-display text-[clamp(26px,3vw,34px)] font-light tracking-tight text-ad-text">
          Foto Website
        </h1>
        <p className="mt-2 text-[14px] leading-[1.65] text-ad-muted">
          Ganti foto di tiap bagian halaman. Saat mengganti, kamu bisa menggeser
          &amp; memotong (crop) agar pas dengan rasionya — hasilnya selalu rapi,
          otomatis dikompres tetap tajam.
        </p>
      </div>

      <FotoTabs groups={groups} />
    </>
  );
}
