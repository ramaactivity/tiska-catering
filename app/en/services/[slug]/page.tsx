import { notFound } from "next/navigation";
import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";
import { services } from "@/lib/landing";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => services.find((s) => s.slug.en === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug.en }));
}

export async function generateMetadata({ params }: Props) {
  const l = find((await params).slug);
  return l ? landingMetadata(l, "en") : {};
}

export default async function LayananDetail({ params }: Props) {
  const l = find((await params).slug);
  if (!l) notFound();
  return <LandingPage l={l} lang="en" />;
}
