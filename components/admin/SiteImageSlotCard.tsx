"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cropper from "react-easy-crop";
import { saveSiteImageAction, resetSiteImageAction } from "@/lib/site-images-actions";

type Area = { x: number; y: number; width: number; height: number };

export type SlotCardProps = {
  slotKey: string;
  label: string;
  ratio: number;
  ratioLabel: string;
  size: string;
  currentSrc: string;
  overridden: boolean;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** Ambil lebar disarankan dari label ukuran (mis. "1000×1000" → 1000). */
function targetWidthFrom(size: string, fallback = 2000): number {
  const n = parseInt(size, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Crop + auto-compress yang tetap tajam:
 * - hanya memperkecil ke lebar disarankan (tak pernah memperbesar → tak pecah),
 * - downscale kualitas tinggi (imageSmoothingQuality),
 * - kualitas JPEG mulai tinggi (0.92), turun bertahap HANYA bila masih > maxBytes.
 */
async function getCroppedBlob(
  src: string,
  area: Area,
  targetW = 2000,
  maxBytes = 1_200_000,
): Promise<Blob> {
  const img = await loadImage(src);
  const scale = area.width > targetW ? targetW / area.width : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(area.width * scale));
  canvas.height = Math.max(1, Math.round(area.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak didukung.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);

  const encode = (q: number) =>
    new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Gagal memproses gambar."))),
        "image/jpeg",
        q,
      ),
    );

  const qualities = [0.92, 0.86, 0.8, 0.74, 0.68];
  let blob = await encode(qualities[0]);
  for (let i = 1; i < qualities.length && blob.size > maxBytes; i++) {
    blob = await encode(qualities[i]);
  }
  return blob;
}

export default function SiteImageSlotCard(props: SlotCardProps) {
  const { slotKey, label, ratio, ratioLabel, size, currentSrc, overridden } = props;
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  const onCropComplete = useCallback((_: Area, px: Area) => setArea(px), []);

  // Popup notifikasi otomatis hilang setelah 3.5 detik.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setError(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setFileSrc(URL.createObjectURL(f));
    e.target.value = "";
  };

  const close = () => {
    if (fileSrc) URL.revokeObjectURL(fileSrc);
    setFileSrc(null);
    setArea(null);
  };

  const save = async () => {
    if (!fileSrc || !area) return;
    setSaving(true);
    setError(null);
    try {
      const blob = await getCroppedBlob(fileSrc, area, targetWidthFrom(size));
      const fd = new FormData();
      fd.append("slot", slotKey);
      fd.append("image", new File([blob], `${slotKey}.jpg`, { type: "image/jpeg" }));
      const res = await saveSiteImageAction(null, fd);
      if (res?.error) {
        setError(res.error);
        setSaving(false);
        setToast({ ok: false, msg: res.error });
        return;
      }
      close();
      setSaving(false);
      setToast({ ok: true, msg: `Foto "${label}" berhasil diganti.` });
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan.";
      setError(msg);
      setSaving(false);
      setToast({ ok: false, msg });
    }
  };

  return (
    <>
      {/* Popup notifikasi berhasil / gagal */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-5 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-xl border px-4 py-3 text-[13px] font-medium shadow-lg"
          style={
            toast.ok
              ? { background: "#0f3d2e", borderColor: "#1f7a55", color: "#d7f5e7" }
              : { background: "#3d1414", borderColor: "#a23a3a", color: "#ffd9d9" }
          }
        >
          <span aria-hidden className="text-[15px]">{toast.ok ? "✓" : "⚠"}</span>
          <span>{toast.msg}</span>
        </div>
      )}

    <div className="overflow-hidden rounded-2xl border border-ad-border bg-ad-panel shadow-[0_1px_2px_var(--ad-shadow)]">
      <div className="relative aspect-[16/10] bg-ad-panel-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {overridden && (
          <span className="absolute left-2 top-2 rounded-md bg-ad-btn/90 px-1.5 py-0.5 text-[10px] font-semibold text-ad-btn-fg">
            Disesuaikan
          </span>
        )}
      </div>
      <div className="p-3.5">
        <p className="text-[14px] font-semibold text-ad-text">{label}</p>
        <p className="mt-0.5 text-[12px] text-ad-subtle">
          Rasio {ratioLabel} · disarankan {size}px
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-ad-border bg-ad-input px-3 py-1.5 text-[12px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent"
          >
            Ganti foto
          </button>
          {overridden && (
            <form action={resetSiteImageAction}>
              <input type="hidden" name="slot" value={slotKey} />
              <button type="submit" className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:text-ad-text">
                Kembalikan default
              </button>
            </form>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={pick} />
      </div>

      {/* Modal cropper */}
      {fileSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="flex w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-ad-border bg-ad-panel shadow-2xl">
            <div className="flex items-center justify-between border-b border-ad-border px-5 py-3">
              <div>
                <p className="text-[14px] font-semibold text-ad-text">Atur foto: {label}</p>
                <p className="text-[12px] text-ad-subtle">Geser & zoom untuk menempatkan, rasio {ratioLabel}. Foto otomatis dikompres tetap tajam.</p>
              </div>
              <button type="button" onClick={close} className="rounded-md px-2 py-1 text-[18px] leading-none text-ad-muted transition-colors hover:text-ad-text">
                ×
              </button>
            </div>

            <div className="relative h-[52vh] w-full bg-ink">
              <Cropper
                image={fileSrc}
                crop={crop}
                zoom={zoom}
                aspect={ratio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid
              />
            </div>

            <div className="border-t border-ad-border px-5 py-3">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[12px] text-ad-subtle">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-1 flex-1 accent-[var(--ad-accent)]"
                />
              </div>
              {error && <p className="mb-2 text-[12px] text-ad-danger">{error}</p>}
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={close} className="rounded-lg px-4 py-2 text-[13px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text">
                  Batal
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={saving || !area}
                  className="rounded-lg bg-ad-btn px-5 py-2 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
                >
                  {saving ? "Menyimpan…" : "Simpan foto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
