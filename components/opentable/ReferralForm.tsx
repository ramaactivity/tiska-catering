"use client";

import { useActionState, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { submitReferralAction, type FormState } from "@/lib/opentable/actions";
import { referralCopy, naskahReferral, acara } from "@/lib/opentable/content";
import { HONEYPOT } from "@/lib/opentable/antispam.client";
import { isiNaskah, waLink } from "@/lib/opentable/kode";

const L = referralCopy.label;

const KELAS_INPUT =
  "w-full rounded-lg border border-line bg-ink-3/60 px-4 py-3 text-[15px] text-paper outline-none transition placeholder:text-paper/25 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(196,160,90,0.12)]";

function Label({ htmlFor, children, opsional }: { htmlFor: string; children: React.ReactNode; opsional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">
      {children}
      {opsional && <span className="ml-2 normal-case tracking-normal text-paper/30">opsional</span>}
    </label>
  );
}

const KELAS_TOMBOL =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-8 py-[14px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink";

export default function ReferralForm({
  token,
  kode,
  perujuk,
  tautanUmum,
}: {
  token: string;
  kode: string;
  perujuk: string;
  /** Tautan undangan tanpa kode — dipakai saat tamu mengundang rekannya sendiri. */
  tautanUmum: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitReferralAction, null);
  const [channel, setChannel] = useState<"sendiri" | "titip">("sendiri");

  if (state?.ok) {
    // Sumbernya jawaban server yang sudah ternormalisasi, bukan state form.
    const hp = state.referral?.hp ?? "";
    const kontak = state.referral?.kontak ?? "";
    const pesan = isiNaskah(naskahReferral, {
      nama: state.referral?.nama || "Bapak/Ibu",
      link: tautanUmum,
    });
    const subjek = `Undangan ${acara.nama} — ${acara.tanggalPanjang}`;

    return (
      <Bingkai>
        <div className="text-center">
          <span aria-hidden className="mx-auto mb-7 flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold-soft">
            ✓
          </span>
          <p className="mx-auto max-w-[440px] text-[15px] leading-[1.85] text-paper/75">
            {channel === "sendiri" ? referralCopy.suksesSendiri : referralCopy.sukses}
          </p>

          {channel === "sendiri" && (
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {hp ? (
                <a href={waLink(hp, pesan)} target="_blank" rel="noopener noreferrer" className={KELAS_TOMBOL}>
                  <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative">{referralCopy.tombolWa}</span>
                </a>
              ) : (
                <a
                  href={`mailto:${encodeURIComponent(kontak)}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(pesan)}`}
                  className={KELAS_TOMBOL}
                >
                  <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative">{referralCopy.tombolEmail}</span>
                </a>
              )}
            </div>
          )}

          <button
            type="button"
            // Muat ulang, bukan sekadar reset: form berikutnya butuh token
            // anti-spam yang baru, dan token hanya diterbitkan saat render server.
            onClick={() => {
              window.location.href = "#referral";
              window.location.reload();
            }}
            className="mt-8 text-[12px] uppercase tracking-[0.18em] text-paper/45 transition-colors hover:text-gold-soft"
          >
            {referralCopy.tambahLagi}
          </button>
        </div>
      </Bingkai>
    );
  }

  return (
    <Bingkai>
      <form action={formAction} className="mx-auto max-w-[620px]">
        <input type="hidden" name="t" value={token} />
        <input type="hidden" name="k" value={kode} />
        <input type="hidden" name="perujuk" value={perujuk} />
        <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor={`${HONEYPOT}-ref`}>Situs perusahaan</label>
          <input id={`${HONEYPOT}-ref`} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="ref-nama">{L.nama}</Label>
            <input
              id="ref-nama"
              name="nama"
              required
              maxLength={80}
              className={KELAS_INPUT}
            />
          </div>
          <div>
            <Label htmlFor="ref-jabatan" opsional>{L.jabatan}</Label>
            <input id="ref-jabatan" name="jabatan" maxLength={100} className={KELAS_INPUT} />
          </div>
          <div>
            <Label htmlFor="ref-perusahaan" opsional>{L.perusahaan}</Label>
            <input id="ref-perusahaan" name="perusahaan" maxLength={100} className={KELAS_INPUT} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="ref-kontak">{L.kontak}</Label>
            <input
              id="ref-kontak"
              name="kontak"
              required
              maxLength={120}
              className={KELAS_INPUT}
            />
          </div>
        </div>

        <fieldset className="mt-9">
          <legend className="mb-3.5 text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">
            {L.channel}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { v: "sendiri" as const, judul: L.channelSendiri, isi: L.channelSendiriCatatan },
              { v: "titip" as const, judul: L.channelTitip, isi: L.channelTitipCatatan },
            ].map((o) => {
              const aktif = channel === o.v;
              return (
                <label
                  key={o.v}
                  className={`cursor-pointer rounded-lg border px-4 py-3.5 transition-colors ${
                    aktif ? "border-gold/70 bg-gold/10" : "border-line bg-ink-3/40 hover:border-gold/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="channel"
                    value={o.v}
                    checked={aktif}
                    onChange={() => setChannel(o.v)}
                    className="sr-only"
                  />
                  <span className={`block text-[14px] ${aktif ? "text-gold-soft" : "text-paper/70"}`}>
                    {o.judul}
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.6] text-paper/40">{o.isi}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {state?.error && <p className="mt-6 text-[13.5px] text-[#d98b7a]">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className={`${KELAS_TOMBOL} mt-10 w-full disabled:opacity-50 sm:w-auto sm:px-10`}
        >
          <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative">{pending ? referralCopy.tombolProses : referralCopy.tombol}</span>
        </button>
      </form>
    </Bingkai>
  );
}

function Bingkai({ children }: { children: React.ReactNode }) {
  return (
    <section id="referral" className="relative bg-ink px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {referralCopy.eyebrow}
          </Eyebrow>
        </Reveal>
        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-8 text-center font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={referralCopy.judul} />
        </h2>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[520px] text-center text-[14.5px] leading-[1.85] text-paper/60">
            {referralCopy.intro}
          </p>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
