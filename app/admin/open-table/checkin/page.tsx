import { requireSession } from "@/lib/auth";
import { getRsvps } from "@/lib/opentable/store";
import CheckinPanel from "@/components/admin/opentable/CheckinPanel";

export const dynamic = "force-dynamic";

export default async function CheckinPage() {
  await requireSession();
  const rows = await getRsvps("confirmed");
  const urut = [...rows].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
  return <CheckinPanel rows={urut} />;
}
