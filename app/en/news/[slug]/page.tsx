import KabarDetail, { kabarDetailMetadata } from "@/components/pages/KabarDetail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return kabarDetailMetadata((await params).slug, "en");
}

export default async function Page({ params }: Props) {
  return <KabarDetail slug={(await params).slug} lang="en" />;
}
