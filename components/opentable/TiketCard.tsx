import { qrTiket } from "@/lib/opentable/qr";
import { tiketCopy, acara } from "@/lib/opentable/content";
import { PIC, VENUE, UNDANGAN_PATH } from "@/lib/opentable/config";
import { tampilHp, waLink } from "@/lib/opentable/kode";
import { labelPreferensi, type Rsvp } from "@/lib/opentable/types";

function Baris({ label, nilai }: { label: string; nilai: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line py-3">
      <span className="text-[10.5px] uppercase tracking-[0.2em] text-gold-soft">{label}</span>
      <span className="text-right text-[14px] text-paper/85">{nilai}</span>
    </div>
  );
}

export default function TiketCard({ rsvp }: { rsvp: Rsvp }) {
  const ubah = waLink(
    PIC.hp,
    `Halo ${PIC.nama}, saya ${rsvp.nama} ingin mengubah konfirmasi kehadiran Tiska Open Table (kode ${rsvp.kode}).`,
  );

  const punyaTiket = rsvp.status === "confirmed";

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="overflow-hidden rounded-2xl border border-gold/30 bg-ink-2">
        <div className="border-b border-line px-7 py-5 text-center">
          <p className="text-[10.5px] uppercase tracking-[0.3em] text-gold-soft">{tiketCopy.eyebrow}</p>
          <h1
            style={{ fontVariationSettings: "'opsz' 144" }}
            className="mt-2.5 font-display text-[26px] font-light leading-tight text-paper"
          >
            {tiketCopy.judul}
          </h1>
          <p className="mt-1.5 text-[12px] text-paper/45">
            {acara.tanggalPanjang} · {acara.jam}
          </p>
        </div>

        {punyaTiket ? (
          <div className="px-7 py-7">
            <div
              className="mx-auto w-full max-w-[230px] overflow-hidden rounded-xl bg-paper p-3 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qrTiket(rsvp.kode) }}
            />
            <p className="mt-5 text-center text-[12.5px] leading-[1.7] text-paper/50">
              {tiketCopy.petunjuk}
            </p>
            <p className="mt-4 text-center font-mono text-[19px] uppercase tracking-[0.32em] text-gold-soft">
              {rsvp.kode}
            </p>
            <p className="mt-1 text-center text-[10px] uppercase tracking-[0.22em] text-paper/30">
              {tiketCopy.kodeLabel}
            </p>
          </div>
        ) : (
          <div className="px-7 py-8 text-center">
            <h2 className="font-display text-[21px] font-light leading-snug text-paper">
              {rsvp.status === "waitlist" ? tiketCopy.waitlistJudul : tiketCopy.declinedJudul}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.8] text-paper/60">
              {rsvp.status === "waitlist" ? tiketCopy.waitlistIsi : tiketCopy.declinedIsi}
            </p>
          </div>
        )}

        <div className="px-7 pb-6">
          <Baris label={tiketCopy.atasNama} nilai={rsvp.nama} />
          {rsvp.perusahaan && <Baris label="Perusahaan" nilai={rsvp.perusahaan} />}
          {punyaTiket && <Baris label={tiketCopy.jumlah} nilai={`${rsvp.pax} ${tiketCopy.orang}`} />}
          {punyaTiket && <Baris label="Tempat" nilai={VENUE.nama} />}
          {rsvp.preferensi.length > 0 && (
            <Baris label="Preferensi" nilai={rsvp.preferensi.map(labelPreferensi).join(", ")} />
          )}
          {rsvp.checkedInAt && (
            <div className="mt-4 rounded-lg border border-teal-deep/40 bg-teal-deep/10 px-4 py-2.5 text-center text-[12.5px] text-teal">
              {tiketCopy.sudahCheckin}
            </div>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href={ubah}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-gold/60 px-6 py-3 text-[11.5px] uppercase tracking-[0.18em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
        >
          {tiketCopy.ubah}
        </a>
        <a
          href={UNDANGAN_PATH}
          className="inline-flex items-center rounded-full border border-line px-6 py-3 text-[11.5px] uppercase tracking-[0.18em] text-paper/55 transition-colors hover:border-gold/50 hover:text-gold-soft"
        >
          {tiketCopy.kembali}
        </a>
      </div>

      <p className="mt-7 text-center text-[11.5px] leading-[1.8] text-paper/35">
        {PIC.nama} · {tampilHp(PIC.hp)}
      </p>
    </div>
  );
}
