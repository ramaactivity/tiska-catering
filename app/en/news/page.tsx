import { KabarPage, pageMetadata } from "@/components/pages/SitePages";

export const metadata = pageMetadata("kabar", "en");

export const dynamic = "force-dynamic";

export default function Page() {
  return <KabarPage lang="en" />;
}
