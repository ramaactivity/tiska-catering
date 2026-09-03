"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { submitRsvpAction, type FormState } from "@/lib/opentable/actions";
import { rsvpCopy } from "@/lib/opentable/content";
import { HONEYPOT } from "@/lib/opentable/antispam.client";
import { MAKS_PAX, PIC } from "@/lib/opentable/config";
import { PREFERENSI } from "@/lib/opentable/types";
import { waLink } from "@/lib/opentable/kode";

const L = rsvpCopy.label;

const KELAS_INPUT =
  "w-full rounded-lg border border-line bg-ink-3/60 px-4 py-3 text-[15px] text-paper outline-none transition placeholder:text-paper/25 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(196,160,90,0.12)]";

function Label({ htmlFor, children, opsional }: { htmlFor: string; children: React.ReactNode; opsional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">
      {children}
      {opsional && <span className="ml-2 normal-case tracking-normal text-paper/30">{rsvpCopy.opsional}</span>}
    </label>
  );
}

export default function RsvpForm({
  token,
  kode,
  awal,
  ditutup,
}: {
  token: string;
  kode: string;
  awal: { nama: string; jabatan: string; perusahaan: string; hp: string; email: string };
  ditutup: boolean;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitRsvpAction, null);
  const [hadir, setHadir] = useState(true);
  const [pax, setPax] = useState(1);

  // Muat halaman tiket lebih awal supaya perpindahannya terasa seketika.
  useEffect(() => {
    if (state?.ok && state.kode) router.prefetch(`/open-table/tiket/${state.kode}`);
  }, [state, router]);

  if (ditutup) {
    return (
      <Bingkai>
        <Reveal>
          <p className="mx-auto max-w-[460px] text-center text-[15px] leading-[1.85] text-paper/65">
            {rsvpCopy.ditutup}
          </p>
          <div className="mt-8 text-center">
            <a
              href={waLink(PIC.hp, `Halo ${PIC.nama}, saya ingin menanyakan kehadiran di Tiska Open Table.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-gold/70 px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
            >
              Hubungi {PIC.nama}
            </a>
          </div>
        </Reveal>
      </Bingkai>
    );
  }

  if (state?.ok) {
    const pesan =
      state.status === "confirmed"
        ? rsvpCopy.suksesHadir
        : state.status === "waitlist"
          ? rsvpCopy.suksesWaitlist
          : rsvpCopy.suksesTidak;
    return (
      <Bingkai>
        <div className="text-center">
          <span aria-hidden className="mx-auto mb-7 flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold-soft">
            ✓
          </span>
          <p className="mx-auto max-w-[440px] text-[15px] leading-[1.85] text-paper/75">{pesan}</p>
          {state.kode && state.status !== "declined" && (
            <a
              href={`/open-table/tiket/${state.kode}`}
              className="group relative mt-9 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-8 py-[14px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink"
            >
              <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative">{rsvpCopy.lihatTiket}</span>
              <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      </Bingkai>
    );
  }

  return (
    <Bingkai>
      <form action={formAction} className="mx-auto max-w-[620px]">
        <input type="hidden" name="t" value={token} />
        <input type="hidden" name="k" value={kode} />
        {/* Jebakan bot: disembunyikan lewat posisi, bukan display:none — sebagian
            bot sengaja melewati medan yang jelas-jelas tersembunyi. */}
        <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor={HONEYPOT}>Situs perusahaan</label>
          <input id={HONEYPOT} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset className="mb-9">
          <legend className="mb-3.5 text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">
            {L.hadir}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { v: "ya", label: L.hadirYa },
              { v: "tidak", label: L.hadirTidak },
            ].map((o) => {
              const aktif = hadir === (o.v === "ya");
              return (
                <label
                  key={o.v}
                  className={`cursor-pointer rounded-lg border px-4 py-3.5 text-center text-[14px] transition-colors ${
                    aktif
                      ? "border-gold/70 bg-gold/10 text-gold-soft"
                      : "border-line bg-ink-3/40 text-paper/55 hover:border-gold/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="hadir"
                    value={o.v}
                    checked={aktif}
                    onChange={() => setHadir(o.v === "ya")}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="nama">{L.nama}</Label>
            <input id="nama" name="nama" required defaultValue={awal.nama} maxLength={80} className={KELAS_INPUT} />
          </div>
          <div>
            <Label htmlFor="jabatan" opsional>{L.jabatan}</Label>
            <input id="jabatan" name="jabatan" defaultValue={awal.jabatan} maxLength={100} className={KELAS_INPUT} />
          </div>
          <div>
            <Label htmlFor="perusahaan" opsional>{L.perusahaan}</Label>
            <input id="perusahaan" name="perusahaan" defaultValue={awal.perusahaan} maxLength={100} className={KELAS_INPUT} />
          </div>
          <div>
            <Label htmlFor="hp">{L.hp}</Label>
            <input
              id="hp"
              name="hp"
              type="tel"
              inputMode="tel"
              required
              defaultValue={awal.hp}
              placeholder="0812 3456 7890"
              className={KELAS_INPUT}
            />
          </div>
          <div>
            <Label htmlFor="email" opsional>{L.email}</Label>
            <input id="email" name="email" type="email" defaultValue={awal.email} maxLength={120} className={KELAS_INPUT} />
          </div>
        </div>

        {hadir && (
          <>
            <div className="mt-9">
              <Label htmlFor="pax">{L.pax}</Label>
              <div className="flex gap-3">
                {Array.from({ length: MAKS_PAX }, (_, i) => i + 1).map((nn) => (
                  <label
                    key={nn}
                    className={`flex-1 cursor-pointer rounded-lg border px-4 py-3 text-center text-[14px] transition-colors ${
                      pax === nn
                        ? "border-gold/70 bg-gold/10 text-gold-soft"
                        : "border-line bg-ink-3/40 text-paper/55 hover:border-gold/35"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pax"
                      value={nn}
                      checked={pax === nn}
                      onChange={() => setPax(nn)}
                      className="sr-only"
                    />
                    {nn} {L.paxSatuan}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-[12px] text-paper/35">{L.paxCatatan}</p>
            </div>

            {pax > 1 && (
              <div className="mt-6">
                <Label htmlFor="pendamping">{L.pendamping}</Label>
                <input id="pendamping" name="pendamping" maxLength={80} className={KELAS_INPUT} />
              </div>
            )}

            <fieldset className="mt-9">
              <legend className="mb-3 text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">
                {L.preferensi}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {PREFERENSI.map((p) => (
                  <label
                    key={p.value}
                    className="cursor-pointer rounded-full border border-line bg-ink-3/40 px-4 py-2 text-[13px] text-paper/60 transition-colors has-[:checked]:border-gold/70 has-[:checked]:bg-gold/10 has-[:checked]:text-gold-soft hover:border-gold/35"
                  >
                    <input type="checkbox" name="preferensi" value={p.value} className="sr-only" />
                    {p.label}
                  </label>
                ))}
              </div>
              <p className="mt-2.5 text-[12px] text-paper/35">{L.preferensiCatatan}</p>
            </fieldset>

            <div className="mt-8">
              <Label htmlFor="alergi" opsional>{L.alergi}</Label>
              <input id="alergi" name="alergi" maxLength={300} placeholder={L.alergiPlaceholder} className={KELAS_INPUT} />
            </div>
          </>
        )}

        <div className="mt-8">
          <Label htmlFor="catatan" opsional>{L.catatan}</Label>
          <textarea id="catatan" name="catatan" rows={3} maxLength={500} placeholder={L.catatanPlaceholder} className={`${KELAS_INPUT} resize-none`} />
        </div>

        {state?.error && <p className="mt-6 text-[13.5px] text-[#d98b7a]">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="group relative mt-10 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-8 py-[16px] text-[12.5px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink disabled:opacity-50 sm:w-auto sm:px-10"
        >
          <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative">{pending ? rsvpCopy.tombolProses : rsvpCopy.tombol}</span>
        </button>
      </form>
    </Bingkai>
  );
}

function Bingkai({ children }: { children: React.ReactNode }) {
  return (
    <section id="rsvp" className="relative bg-ink-2 px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {rsvpCopy.eyebrow}
          </Eyebrow>
        </Reveal>
        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-8 text-center font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={rsvpCopy.judul} />
        </h2>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[500px] text-center text-[14.5px] leading-[1.85] text-paper/60">
            {rsvpCopy.intro}
          </p>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
