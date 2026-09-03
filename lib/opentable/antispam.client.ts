/**
 * Nama medan jebakan, dipisah dari antispam.ts karena file itu server-only
 * (memakai crypto). Form klien hanya perlu namanya, bukan logika tanda tangan.
 */
export const HONEYPOT = "perusahaan_url";
