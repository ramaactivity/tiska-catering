import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DaftarUndanganPage() {
  await requireSession();
  return (
    <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center">
      <h2 className="font-display text-[22px] font-light text-ad-text">Daftar undangan</h2>
      <p className="mx-auto mt-2 max-w-[460px] text-[14px] leading-[1.7] text-ad-muted">
        Belum ada tamu. Fitur impor daftar tamu sedang disiapkan.
      </p>
    </div>
  );
}
