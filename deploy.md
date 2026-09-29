# Deploy — Tiska Catering

## Jalur deploy (BARU)

```
git push origin main  →  GitHub Actions  →  Vercel CLI (pakai token)  →  Production
```

Deploy **TIDAK** lagi lewat native Git integration Vercel. Setiap push ke
branch `main` memicu workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
yang menjalankan `vercel pull → rm -rf .git → vercel deploy --prod` memakai
**VERCEL_TOKEN**.

> **Install & build dilakukan DI VERCEL**, bukan di runner GitHub (tanpa
> `vercel build` lokal, tanpa setup package manager di CI). Runner cuma upload
> source + trigger deploy — Vercel yang install dependency & build pakai
> cache-nya sendiri, jadi lebih andal.

## Kenapa `rm -rf .git` WAJIB sebelum deploy

Saat ada metadata git, Vercel mencoba mencocokkan **email commit-author** dengan
member akun Vercel. Karena commit dibuat oleh `ramaactivity`
(`rama.activity98@gmail.com`) sedangkan akun Vercel project ini emailnya beda,
di **Hobby tier** deploy ke-block dengan error **"commit email could not be
matched"**.

Dengan membuang `.git` di runner sebelum `vercel deploy`, tidak ada commit-author
untuk dicocokkan → deploy diatribusikan ke **pemilik VERCEL_TOKEN**, sehingga
lolos. Source code tetap ter-upload utuh (Vercel deploy meng-upload working
directory, bukan via git).

## Kenapa pakai CI token, bukan native Git integration

Satu **GitHub account** (`ramaactivity`) hanya bisa "login-connect" ke **SATU
akun Vercel** dalam satu waktu. Rama punya beberapa project di beberapa akun
Vercel terpisah. Kalau semuanya pakai native Git integration, project-project
itu saling rebutan koneksi GitHub yang sama → koneksi terus lepas → deploy
ke-block.

Token CI tidak terikat ke koneksi GitHub↔Vercel, jadi tiap repo bisa deploy ke
akun Vercel-nya masing-masing tanpa saling ganggu. Pola ini sudah terbukti di
project lain (tetra-ops).

## Akun & domain project ini

| Item | Nilai |
|---|---|
| GitHub repo | `ramaactivity/tiska-catering` |
| Vercel team/org | `team_DrIFTCibqzGWz5gnPFEDQ1mi` |
| Vercel project | `tiska-catering` (`prj_GJiHPUq7mIHhRTMyEs7REIK2ZkcP`) |
| Alias domain | `tiskacatering.com` (DNS A + CNAME di Squarespace) |
| Akun Vercel | akun Vercel khusus project ini (email beda dari project Rama yang lain) |

> Catatan: `orgId` & `projectId` di-inline di workflow karena **bukan rahasia**.
> Satu-satunya secret = `VERCEL_TOKEN`.

## Setup token (sekali saja)

1. Vercel project ini → **Settings → Tokens** → buat token, scope ke team yang
   benar, **No Expiration**.
2. GitHub repo → **Settings → Secrets and variables → Actions** → tambah secret
   `VERCEL_TOKEN`.
3. Setelah Actions hijau: Vercel project → **Settings → Git → Disconnect** untuk
   mematikan native Git integration (biar tidak dobel-deploy).

## Troubleshooting

| Gejala | Kemungkinan penyebab |
|---|---|
| **Actions merah** di step `vercel pull/deploy` | `VERCEL_TOKEN` expired / dicabut / salah scope team. Buat token baru, update secret. |
| **Actions merah** saat build (di log deploy Vercel) | Error build app — sama dengan `npm run build` lokal. Buka build log di dashboard Vercel. |
| **"commit email could not be matched"** | Step `rm -rf .git` terhapus/gagal. Pastikan step itu jalan SEBELUM `vercel deploy`. |
| **Deploy dobel** (dua deployment muncul tiap push) | Native Git integration belum di-disconnect di Vercel project (Settings → Git → Disconnect). |

## Aturan WAJIB

- Deploy **hanya** via `git push` (memicu Actions). **Jangan** pernah deploy
  manual via Vercel CLI dari lokal.
- **JANGAN** sentuh MX/TXT record di Squarespace (email @tiskacatering.com aktif
  via Google Workspace).
- Verifikasi `git remote -v` = `ramaactivity/tiska-catering` dan git author benar
  sebelum push.


## Catatan wilayah fungsi (29 Sep 2026)

Audit performa menemukan request mendarat di edge Singapura (`sin1`) tapi
fungsinya dieksekusi di `iad1` (Virginia) — pengunjung Jakarta membayar satu
putaran ke Amerika, dan itu penyumbang terbesar TTFB beranda.

Perbaikannya (`"regions": ["sin1"]` di `vercel.json`) **tidak bisa dipakai di
plan Hobby**. Sudah dicoba dan gagal. Pasang begitu naik ke Pro.

Sekalian pelajaran dari percobaan itu: `vercel.json` divalidasi ketat — properti
yang tidak dikenal, termasuk kunci komentar `"//"`, membuat CLI menolak
deploy dengan `Invalid vercel.json - should NOT have additional property`.
Jangan taruh komentar di file itu.
