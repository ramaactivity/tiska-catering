import { notFound } from "next/navigation";
import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";
import { areas } from "@/lib/landing";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => areas.find((s) => s.slug.id === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((s) => ({ slug: s.slug.id }));
}

export async function generateMetadata({ params }: Props) {
  const l = find((await params).slug);
  return l ? landingMetadata(l, "id") : {};
}

export default async function AreaDetail({ params }: Props) {
  const l = find((await params).slug);
  if (!l) notFound();
  return <LandingPage l={l} lang="id" />;
}
