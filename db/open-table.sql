-- =====================================================================
--  Tiska Open Table — 7 Oktober 2026, Plaza Mutiara lt. 9
--  Skema database untuk undangan digital + RSVP + check-in.
--
--  CARA PAKAI (sekali saja):
--    Supabase Dashboard → SQL Editor → New query → paste SELURUH file ini → Run.
--  Aman dijalankan ulang (idempotent) — tidak menghapus data yang sudah ada.
--
--  Kenapa Postgres, bukan JSON di Storage seperti fitur lain?
--  Fitur ini punya banyak penulis bersamaan (tamu yang RSVP). Pola
--  baca-array → ubah → tulis-ulang-array akan MENGHILANGKAN RSVP secara
--  diam-diam bila dua tamu submit di detik yang sama. Untuk acara sekali
--  jalan dengan 50 nama VIP, itu kegagalan yang tidak boleh ada.
-- =====================================================================

create extension if not exists pgcrypto;

-- ─── 1) Daftar undangan (di-import admin) ────────────────────────────
create table if not exists open_table_guest (
  id           uuid primary key default gen_random_uuid(),
  kode         text not null unique,             -- 6 karakter, dipakai di ?k=
  nama         text not null,
  jabatan      text not null default '',
  perusahaan   text not null default '',
  hp           text not null default '',         -- ternormalisasi: 62xxxxxxxxxx
  email        text not null default '',
  status       text not null default 'belum-kirim'
               check (status in ('belum-kirim','terkirim','dibuka','rsvp')),
  sent_at      timestamptz,
  sent_channel text,                             -- 'wa' | 'email'
  opened_at    timestamptz,                      -- pertama kali sampul dibuka
  open_count   integer not null default 0,
  referred_by  text,                             -- kode tamu yang merekomendasikan
  catatan      text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists open_table_guest_status_idx on open_table_guest (status);
create index if not exists open_table_guest_hp_idx     on open_table_guest (hp);

-- ─── 2) RSVP + tiket ─────────────────────────────────────────────────
create table if not exists open_table_rsvp (
  id             uuid primary key default gen_random_uuid(),
  kode           text not null unique,           -- kode tiket, yang di-encode ke QR
  guest_kode     text references open_table_guest(kode) on delete set null,
  hadir          boolean not null,
  pax            integer not null default 1 check (pax between 1 and 5),
  nama           text not null,
  jabatan        text not null default '',
  perusahaan     text not null default '',
  email          text not null default '',
  hp             text not null default '',
  preferensi     text[] not null default '{}',   -- halal / vegetarian / tanpa-seafood / ...
  pendamping     text[] not null default '{}',   -- nama pendamping bila pax > 1
  alergi         text not null default '',
  catatan        text not null default '',
  status         text not null default 'confirmed'
                 check (status in ('confirmed','waitlist','declined','cancelled')),
  checked_in_at  timestamptz,
  checked_in_pax integer,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
-- Satu tamu terundang = satu RSVP. Submit ulang memperbarui, bukan menambah kursi.
create unique index if not exists open_table_rsvp_guest_uidx
  on open_table_rsvp (guest_kode) where guest_kode is not null;
create index if not exists open_table_rsvp_status_idx on open_table_rsvp (status);
create index if not exists open_table_rsvp_hp_idx     on open_table_rsvp (hp);

-- Kolom menyusul (aman untuk database yang sudah terlanjur dibuat versi awal).
alter table open_table_rsvp add column if not exists pendamping text[] not null default '{}';

-- ─── 3) Referral "ajak rekan" ────────────────────────────────────────
create table if not exists open_table_referral (
  id            uuid primary key default gen_random_uuid(),
  referrer_kode text,
  referrer_nama text not null default '',
  nama          text not null,
  jabatan       text not null default '',
  perusahaan    text not null default '',
  kontak        text not null default '',        -- WA atau email
  channel       text not null default 'titip' check (channel in ('sendiri','titip')),
  status        text not null default 'baru'
                check (status in ('baru','diproses','diundang','ditolak')),
  catatan       text not null default '',
  created_at    timestamptz not null default now()
);
create index if not exists open_table_referral_status_idx on open_table_referral (status);

-- ─── 4) Submit RSVP: atomik, kapasitas mustahil kelewat ──────────────
-- pg_advisory_xact_lock menyerialkan seluruh submit dalam transaksi ini
-- (lepas otomatis saat commit). Ini inti kebenaran hitungan kursi.
create or replace function open_table_submit_rsvp(
  p_kode text, p_guest_kode text, p_hadir boolean, p_pax integer,
  p_nama text, p_jabatan text, p_perusahaan text, p_email text, p_hp text,
  p_preferensi text[], p_pendamping text[], p_alergi text, p_catatan text,
  p_kapasitas integer
) returns open_table_rsvp
language plpgsql security definer set search_path = public as $$
declare
  v_ada      open_table_rsvp;
  v_terpakai integer;
  v_status   text;
  v_pax      integer := greatest(coalesce(p_pax, 1), 1);
  v_row      open_table_rsvp;
begin
  perform pg_advisory_xact_lock(hashtext('open_table_rsvp'));

  -- Cari RSVP yang sudah ada: prioritas kode tamu, lalu nomor HP (24 jam terakhir).
  if coalesce(p_guest_kode, '') <> '' then
    select * into v_ada from open_table_rsvp where guest_kode = p_guest_kode;
  end if;
  if v_ada.id is null and coalesce(p_hp, '') <> '' then
    select * into v_ada from open_table_rsvp
     where hp = p_hp and created_at > now() - interval '24 hours'
     order by created_at desc limit 1;
  end if;

  if not p_hadir then
    v_status := 'declined';
  else
    select coalesce(sum(pax), 0) into v_terpakai
      from open_table_rsvp
     where status = 'confirmed' and (v_ada.id is null or id <> v_ada.id);
    v_status := case when v_terpakai + v_pax <= p_kapasitas then 'confirmed' else 'waitlist' end;
  end if;

  if v_ada.id is not null then
    update open_table_rsvp set
      guest_kode = coalesce(nullif(p_guest_kode, ''), guest_kode),
      hadir = p_hadir, pax = v_pax, nama = p_nama, jabatan = p_jabatan,
      perusahaan = p_perusahaan, email = p_email, hp = p_hp,
      preferensi = coalesce(p_preferensi, '{}'), pendamping = coalesce(p_pendamping, '{}'),
      alergi = p_alergi, catatan = p_catatan,
      -- Jangan turunkan orang yang sudah confirmed jadi waitlist saat dia menyunting.
      status = case when status = 'confirmed' and v_status = 'waitlist'
                    then 'confirmed' else v_status end,
      updated_at = now()
    where id = v_ada.id
    returning * into v_row;      -- kode tiket lama sengaja dipertahankan
  else
    insert into open_table_rsvp
      (kode, guest_kode, hadir, pax, nama, jabatan, perusahaan, email, hp,
       preferensi, pendamping, alergi, catatan, status)
    values
      (p_kode, nullif(p_guest_kode, ''), p_hadir, v_pax, p_nama, p_jabatan, p_perusahaan,
       p_email, p_hp, coalesce(p_preferensi, '{}'), coalesce(p_pendamping, '{}'),
       p_alergi, p_catatan, v_status)
    returning * into v_row;
  end if;

  if coalesce(p_guest_kode, '') <> '' then
    update open_table_guest set status = 'rsvp', updated_at = now() where kode = p_guest_kode;
  end if;

  return v_row;
end $$;

-- ─── 5) Check-in: idempoten (scan kedua tidak menimpa jam masuk) ─────
create or replace function open_table_checkin(p_kode text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_row open_table_rsvp; v_sudah boolean := false;
begin
  select * into v_row from open_table_rsvp where kode = p_kode for update;
  if not found then
    return jsonb_build_object('ok', false, 'reason', 'notfound');
  end if;
  if v_row.checked_in_at is not null then
    v_sudah := true;
  else
    update open_table_rsvp
       set checked_in_at  = now(),
           checked_in_pax = coalesce(checked_in_pax, pax),
           updated_at     = now()
     where id = v_row.id
    returning * into v_row;
  end if;
  return jsonb_build_object('ok', true, 'sudah', v_sudah, 'rsvp', to_jsonb(v_row));
end $$;

-- ─── 6) Statistik: satu query untuk header admin ─────────────────────
create or replace view open_table_stats with (security_invoker = on) as
select
  count(*) filter (where status = 'confirmed')              as jml_hadir,
  coalesce(sum(pax) filter (where status = 'confirmed'), 0) as total_pax,
  count(*) filter (where status = 'waitlist')               as jml_waitlist,
  count(*) filter (where status = 'declined')               as jml_tidak_hadir,
  count(*) filter (where checked_in_at is not null)         as jml_checkin
from open_table_rsvp;

-- ─── 7) Kunci akses ──────────────────────────────────────────────────
-- RLS aktif TANPA satu pun policy = anon & authenticated tidak bisa apa-apa.
-- Server kita memakai service-role key yang melewati RLS.
-- Ini penting: tabel ini berisi nama, jabatan, dan nomor HP tokoh korporat.
alter table open_table_guest    enable row level security;
alter table open_table_rsvp     enable row level security;
alter table open_table_referral enable row level security;

revoke all on open_table_guest, open_table_rsvp, open_table_referral from anon, authenticated;
revoke all on open_table_stats from anon, authenticated;

-- Fungsi di atas WAJIB security definer (harus melewati RLS), jadi hak
-- eksekusinya harus dicabut eksplisit — kalau tidak, anon bisa memanggilnya.
revoke execute on function open_table_submit_rsvp(
  text, text, boolean, integer, text, text, text, text, text,
  text[], text[], text, text, integer
) from anon, authenticated;
revoke execute on function open_table_checkin(text) from anon, authenticated;
