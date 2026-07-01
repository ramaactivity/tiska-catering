"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedFile, type CropArea } from "@/lib/crop-image";
import { lockScroll, unlockScroll } from "@/lib/lenis-lock";

type Props = {
  /** nama field form (yang dibaca server action) */
  name?: string;
  /** rasio crop (lebar/tinggi) */
  aspect: number;
  ratioLabel: string;
  /** kelas aspek untuk area pratinjau, mis. "aspect-[4/5]" */
  aspectClass: string;
  currentUrl?: string;
  sizeHint?: string;
  /** overlay di atas pratinjau (mis. badge kategori / teks banner) */
  children?: React.ReactNode;
  className?: string;
};

export default function CropImageInput({
  name = "image",
  aspect,
  ratioLabel,
  aspectClass,
  currentUrl = "",
  sizeHint,
  children,
  className = "",
}: Props) {
  const formRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState(currentUrl);
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<CropArea | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_: CropArea, px: CropArea) => setArea(px), []);

  // Kunci scroll latar selama modal cropper terbuka (cegah kedip & konflik wheel).
  useEffect(() => {
    if (!fileSrc) return;
    lockScroll();
    return () => unlockScroll();
  }, [fileSrc]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setError(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setFileSrc(URL.createObjectURL(f));
  };

  const closeModal = () => {
    if (fileSrc) URL.revokeObjectURL(fileSrc);
    setFileSrc(null);
    setArea(null);
  };

  const apply = async () => {
    if (!fileSrc || !area || !formRef.current) return;
    setBusy(true);
    setError(null);
    try {
      const file = await getCroppedFile(fileSrc, area, `${name}-${Date.now()}.jpg`);
      const dt = new DataTransfer();
      dt.items.add(file);
      formRef.current.files = dt.files;
      setPreview((p) => {
        if (p.startsWith("blob:")) URL.revokeObjectURL(p);
        return URL.createObjectURL(file);
      });
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memproses gambar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <input ref={formRef} type="file" name={name} accept="image/*" className="sr-only" tabIndex={-1} aria-hidden />
      <input ref={pickerRef} type="file" accept="image/*" className="sr-only" onChange={pick} />

      <button
        type="button"
        onClick={() => pickerRef.current?.click()}
        className={`group relative block w-full overflow-hidden ${aspectClass} ${className}`}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            {children}
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="rounded-lg bg-white/15 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
                Ganti & crop
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-ad-border-strong text-center transition-colors group-hover:border-ad-accent">
            <span className="text-[20px] text-ad-accent">↑</span>
            <span className="text-[13px] font-medium text-ad-muted">Unggah & crop foto</span>
            {sizeHint && <span className="text-[11px] text-ad-subtle">{sizeHint}</span>}
          </div>
        )}
      </button>

      {fileSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="flex w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-ad-border bg-ad-panel shadow-2xl">
            <div className="flex items-center justify-between border-b border-ad-border px-5 py-3">
              <div>
                <p className="text-[14px] font-semibold text-ad-text">Atur & potong foto</p>
                <p className="text-[12px] text-ad-subtle">Geser & zoom, rasio {ratioLabel}.</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-md px-2 py-1 text-[18px] leading-none text-ad-muted transition-colors hover:text-ad-text">
                ×
              </button>
            </div>
            <div className="relative h-[52vh] w-full bg-ink">
              <Cropper image={fileSrc} crop={crop} zoom={zoom} aspect={aspect} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} showGrid />
            </div>
            <div className="border-t border-ad-border px-5 py-3">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[12px] text-ad-subtle">Zoom</span>
                <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-1 flex-1 accent-[var(--ad-accent)]" />
              </div>
              {error && <p className="mb-2 text-[12px] text-ad-danger">{error}</p>}
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={closeModal} className="rounded-lg px-4 py-2 text-[13px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text">
                  Batal
                </button>
                <button type="button" onClick={apply} disabled={busy || !area} className="rounded-xl bg-ad-btn px-5 py-2 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50">
                  {busy ? "Memproses…" : "Pakai foto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
