/**
 * Klien Supabase Postgres untuk fitur Open Table.
 * Sengaja mencerminkan bentuk lib/storage.ts: cek env → klien malas (lazy) singleton.
 *
 * Memakai SERVICE ROLE key, jadi melewati RLS. Tabel open_table_* punya RLS aktif
 * tanpa policy (lihat db/open-table.sql), artinya HANYA server yang bisa membacanya.
 * Jangan pernah impor file ini dari komponen client.
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** true bila kredensial Supabase lengkap. false → fitur tampil sebagai "belum aktif". */
export function openTableEnabled(): boolean {
  return !!(SUPABASE_URL && SERVICE_ROLE_KEY);
}

let _client: SupabaseClient | null = null;

export function sb(): SupabaseClient {
  if (!_client) {
    _client = createClient(SUPABASE_URL, SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

/** Kode error Postgres untuk pelanggaran unique constraint. */
export const UNIQUE_VIOLATION = "23505";
