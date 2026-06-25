"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addDayAction,
  updateDayAction,
  toggleDayAction,
  deleteDayAction,
  refreshSourceAction,
  testReminderAction,
  type FormState,
} from "@/lib/special-days/actions";
import {
  KATEGORI_LABEL,
  KATEGORI_WARNA,
  SPECIAL_CATEGORIES,
  type SpecialDay,
} from "@/lib/special-days/types";

const field =
  "w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 text-[14px] text-ad-text placeholder:text-ad-subtle outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]";
const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-ad-text";

function addDaysStr(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function fmtTanggal(t: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${t}T00:00:00`));
}
function hariLabel(n: number): string {
  if (n === 0) return "Hari ini";
  if (n === 1) return "Besok";
  if (n > 1) return `${n} hari lagi`;
  return `${Math.abs(n)} hari lalu`;
}
function bannerLink(d: SpecialDay): string {
  const params = new URLSearchParams({
    judul: d.nama,
    label: d.nama,
    mulai: addDaysStr(d.tanggal, -7),
    selesai: d.tanggal,
  });
  return `/admin/banners/new?${params.toString()}`;
}

function Badge({ k }: { k: SpecialDay["kategori"] }) {
  const c = KATEGORI_WARNA[k];
  return (
    <span
      className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-medium"
      style={{ backgroundColor: `${c}1f`, color: c }}
    >
      {KATEGORI_LABEL[k]}
    </span>
  );
}

export default function SpecialDayManager({
  days,
  today,
}: {
  days: SpecialDay[];
  today: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"upcoming" | "all">("upcoming");
  const [editing, setEditing] = useState<SpecialDay | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const flash = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  // Tambah
  const [addState, addAction, adding] = useActionState<FormState, FormData>(
    async (prev, fd) => {
      const res = await addDayAction(prev, fd);
      if (res?.ok) {
        router.refresh();
        flash("Hari spesial ditambahkan.");
      }
      return res;
    },
    null,
  );

  // Edit
  const [editState, editAction, editingPending] = useActionState<FormState, FormData>(
    async (prev, fd) => {
      const res = await updateDayAction(prev, fd);
      if (res?.ok) {
        setEditing(null);
        router.refresh();
        flash("Hari spesial diperbarui.");
      }
      return res;
    },
    null,
  );

  // Refresh dari sumber
  const [refreshState, refreshAction, refreshing] = useActionState<FormState, FormData>(
    async () => {
      const res = await refreshSourceAction();
      if (res?.ok) {
        router.refresh();
        flash(res.info ?? "Berhasil disegarkan.");
      }
      return res;
    },
    null,
  );

  // Tes email reminder
  const [, testAction, testing] = useActionState<FormState, FormData>(
    async () => {
      const res = await testReminderAction();
      flash(res?.ok ? (res.info ?? "Email uji terkirim.") : (res?.error ?? "Gagal mengirim."), !!res?.ok);
      return res;
    },
    null,
  );

  const shown = useMemo(() => {
    if (tab === "upcoming") return days.filter((d) => d.aktif && d.tanggal >= today);
    return days;
  }, [days, today, tab]);

  const upcomingCount = useMemo(
    () => days.filter((d) => d.aktif && d.tanggal >= today).length,
    [days, today],
  );

  return (
    <div>
      {toast && (
        <div
          className="fixed left-1/2 top-5 z-[60] -translate-x-1/2 rounded-xl border px-4 py-3 text-[13px] font-medium shadow-lg"
          style={
            toast.ok
              ? { background: "#0f3d2e", borderColor: "#1f7a55", color: "#d7f5e7" }
              : { background: "#3d1414", borderColor: "#a23a3a", color: "#ffd9d9" }
          }
        >
          {toast.ok ? "✓" : "⚠"} {toast.msg}
        </div>
      )}

      {/* Tambah hari spesial */}
      <form
        action={addAction}
        className="rounded-2xl bg-ad-panel p-5 shadow-[0_1px_3px_var(--ad-shadow)] ring-1 ring-inset ring-ad-border/70"
      >
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ad-subtle">
          Tambah hari spesial
        </p>
        <div className="grid gap-3 md:grid-cols-[170px_1fr_170px_auto]">
          <div>
            <label className={labelCls}>Tanggal</label>
            <input type="date" name="tanggal" required className={field} />
          </div>
          <div>
            <label className={labelCls}>Nama hari</label>
            <input name="nama" required placeholder="mis. Anniversary Tiska, Cap Go Meh" className={field} />
          </div>
          <div>
            <label className={labelCls}>Kategori</label>
            <select name="kategori" defaultValue="custom" className={field}>
              {SPECIAL_CATEGORIES.map((k) => (
                <option key={k} value={k}>
                  {KATEGORI_LABEL[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={adding}
              className="h-[44px] w-full rounded-xl bg-ad-btn px-5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50 md:w-auto"
            >
              {adding ? "Menambah…" : "+ Tambah"}
            </button>
          </div>
        </div>
        {addState?.error && <p className="mt-2.5 text-[12px] text-ad-danger">{addState.error}</p>}
      </form>

      {/* Toolbar: tab + refresh */}
      <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setTab("upcoming")}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
              tab === "upcoming"
                ? "bg-ad-text text-ad-bg"
                : "bg-ad-panel text-ad-muted ring-1 ring-inset ring-ad-border hover:text-ad-text"
            }`}
          >
            Akan datang
            <span className="ml-1.5 text-[11px] tabular-nums opacity-70">{upcomingCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("all")}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
              tab === "all"
                ? "bg-ad-text text-ad-bg"
                : "bg-ad-panel text-ad-muted ring-1 ring-inset ring-ad-border hover:text-ad-text"
            }`}
          >
            Semua
            <span className="ml-1.5 text-[11px] tabular-nums opacity-70">{days.length}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <form action={testAction}>
            <button
              type="submit"
              disabled={testing}
              title="Kirim email uji ke penerima reminder"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-medium text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text disabled:opacity-50"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {testing ? "Mengirim…" : "Tes email"}
            </button>
          </form>
          <form action={refreshAction}>
            <button
              type="submit"
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-ad-border bg-ad-input px-4 py-2 text-[13px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent disabled:opacity-50"
            >
              <svg className={refreshing ? "animate-spin" : ""} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {refreshing ? "Menarik data…" : "Tarik dari sumber publik"}
            </button>
          </form>
        </div>
      </div>
      {refreshState?.info && <p className="-mt-2 mb-4 text-[12px] text-ad-subtle">{refreshState.info}</p>}

      {/* Daftar */}
      {shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-14 text-center text-[14px] text-ad-muted shadow-[0_1px_2px_var(--ad-shadow)]">
          {tab === "upcoming"
            ? "Belum ada hari spesial mendatang. Tarik dari sumber publik atau tambah manual di atas."
            : "Belum ada data. Tarik dari sumber publik untuk mengisi otomatis."}
        </div>
      ) : (
        <ul className="divide-y divide-ad-border/70 overflow-hidden rounded-2xl bg-ad-panel shadow-[0_1px_3px_var(--ad-shadow)] ring-1 ring-inset ring-ad-border/70">
          {shown.map((d) => {
            const n = Math.round(
              (Date.parse(`${d.tanggal}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000,
            );
            const lewat = n < 0;
            return (
              <li
                key={d.id}
                className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 transition-colors hover:bg-ad-accent-weak ${
                  d.aktif ? "" : "opacity-55"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold text-ad-text">
                    {d.nama}
                    <Badge k={d.kategori} />
                    {!d.aktif && <span className="text-[11px] font-normal text-ad-subtle">· Nonaktif</span>}
                  </p>
                  <p className="mt-1 text-[12px] text-ad-subtle">
                    {fmtTanggal(d.tanggal)}
                    {!lewat && <span className="text-ad-accent"> · {hariLabel(n)}</span>}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={bannerLink(d)}
                    className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-ad-accent transition-colors hover:bg-ad-bg"
                    title="Buat banner terjadwal dari hari ini"
                  >
                    Buat banner
                  </Link>
                  <button
                    type="button"
                    onClick={() => setEditing(d)}
                    aria-label="Edit"
                    className="flex size-8 items-center justify-center rounded-lg text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <form
                    action={deleteDayAction}
                    onSubmit={(e) => {
                      if (!confirm(`Hapus "${d.nama}"?`)) e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="id" value={d.id} />
                    <button
                      type="submit"
                      aria-label="Hapus"
                      className="flex size-8 items-center justify-center rounded-lg text-ad-muted transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      </svg>
                    </button>
                  </form>
                  <form action={toggleDayAction} title={d.aktif ? "Nonaktifkan" : "Aktifkan"}>
                    <input type="hidden" name="id" value={d.id} />
                    <button
                      type="submit"
                      aria-label={d.aktif ? "Nonaktifkan" : "Aktifkan"}
                      className={`ml-1 flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                        d.aktif ? "bg-ad-btn" : "bg-ad-border-strong"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-[#fcfaf5] shadow-sm transition-transform ${
                          d.aktif ? "translate-x-4" : ""
                        }`}
                      />
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Modal edit */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form
            action={editAction}
            className="w-full max-w-[460px] rounded-3xl bg-ad-panel p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-ad-border"
          >
            <input type="hidden" name="id" value={editing.id} />
            <p className="mb-5 font-display text-[19px] font-light text-ad-text">Edit hari spesial</p>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Tanggal</label>
                <input type="date" name="tanggal" required defaultValue={editing.tanggal} className={field} />
              </div>
              <div>
                <label className={labelCls}>Nama hari</label>
                <input name="nama" required defaultValue={editing.nama} className={field} />
              </div>
              <div>
                <label className={labelCls}>Kategori</label>
                <select name="kategori" defaultValue={editing.kategori} className={field}>
                  {SPECIAL_CATEGORIES.map((k) => (
                    <option key={k} value={k}>
                      {KATEGORI_LABEL[k]}
                    </option>
                  ))}
                </select>
              </div>
              {editState?.error && <p className="text-[12px] text-ad-danger">{editState.error}</p>}
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl px-4 py-2 text-[13px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={editingPending}
                className="rounded-xl bg-ad-btn px-5 py-2 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
              >
                {editingPending ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
