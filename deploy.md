# Deploy — Tiska Catering

## Jalur deploy (BARU)

```
git push origin main  →  GitHub Actions  →  Vercel CLI (pakai token)  →  Production
```

Deploy **TIDAK** lagi lewat native Git integration Vercel. Setiap push ke
branch `main` memicu workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
yang menjalankan `vercel pull → vercel build → vercel deploy --prebuilt --prod`
memakai **VERCEL_TOKEN**.

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
| **Actions merah** di step `vercel pull/build/deploy` | `VERCEL_TOKEN` expired / dicabut / salah scope team. Buat token baru, update secret. |
| **Deploy dobel** (dua deployment muncul tiap push) | Native Git integration belum di-disconnect di Vercel project (Settings → Git → Disconnect). |
| Build gagal tapi token oke | Cek error build di log Actions — sama dengan `npm run build` lokal. |

## Aturan WAJIB

- Deploy **hanya** via `git push` (memicu Actions). **Jangan** pernah deploy
  manual via Vercel CLI dari lokal.
- **JANGAN** sentuh MX/TXT record di Squarespace (email @tiskacatering.com aktif
  via Google Workspace).
- Verifikasi `git remote -v` = `ramaactivity/tiska-catering` dan git author benar
  sebelum push.
