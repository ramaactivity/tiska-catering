import { TentangPage, pageMetadata } from "@/components/pages/SitePages";

export const metadata = pageMetadata("tentang", "id");
export const revalidate = 60;

export default function Page() {
  return <TentangPage lang="id" />;
}
