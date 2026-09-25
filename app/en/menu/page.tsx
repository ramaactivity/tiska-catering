import { MenuPage, pageMetadata } from "@/components/pages/SitePages";

export const metadata = pageMetadata("menu", "en");

export default function Page() {
  return <MenuPage lang="en" />;
}
