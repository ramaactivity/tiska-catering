import { GaleriPage, pageMetadata } from "@/components/pages/SitePages";

export const metadata = pageMetadata("galeri", "en");

export const dynamic = "force-dynamic";

export default function Page() {
  return <GaleriPage lang="en" />;
}
