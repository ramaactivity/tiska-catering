import type { Metadata } from "next";
import { requireSession } from "@/lib/auth";
import { getSiteImages, readOverrides, SITE_IMAGE_GROUPS } from "@/lib/site-images";
import SiteImageSlotCard from "@/components/admin/SiteImageSlotCard";

export const metadata: Metadata = { title: "Foto Website — Backoffice Tiska" };
export const dynamic = "force-dynamic";

export default async function FotoPage() {
  await requireSession();
  const si = await getSiteImages();
  const ov = await readOverrides();

  return (
    <>
      <div className="mb-2">
          <h1 className="text-[27px] font-bold tracking-tight text-ad-text">Foto Website</h1>
          <p className="mt-1 max-w-[640px] text-[14px] leading-[1.6] text-ad-muted">
            Ganti foto di tiap bagian halaman. Saat mengganti, kamu bisa menggeser
            & memotong (crop) foto agar pas dengan rasio yang dibutuhkan, jadi
            hasilnya selalu rapi tanpa perlu mengedit dulu.
          </p>
        </div>

        {SITE_IMAGE_GROUPS.map((g) => (
          <section key={g.group} className="mt-9">
            <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ad-subtle">
              {g.group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.slots.map((s) => (
                <SiteImageSlotCard
                  key={s.key}
                  slotKey={s.key}
                  label={s.label}
                  ratio={s.ratio}
                  ratioLabel={s.ratioLabel}
                  size={s.size}
                  currentSrc={s.srcOf(si)}
                  overridden={!!ov[s.key]}
                />
              ))}
            </div>
          </section>
        ))}
    </>
  );
}
