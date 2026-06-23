/** Util crop sisi-klien: hasilkan File JPEG dari sumber gambar + area piksel crop. */

export type CropArea = { x: number; y: number; width: number; height: number };

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

export async function getCroppedFile(
  src: string,
  area: CropArea,
  filename: string,
  maxW = 2000,
): Promise<File> {
  const img = await loadImage(src);
  const scale = area.width > maxW ? maxW / area.width : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(area.width * scale));
  canvas.height = Math.max(1, Math.round(area.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak didukung.");
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Gagal memproses gambar."))), "image/jpeg", 0.9),
  );
  return new File([blob], filename, { type: "image/jpeg" });
}
