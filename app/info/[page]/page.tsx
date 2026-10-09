import { notFound } from "next/navigation";
import LegalContent from "@/components/LegalContent";
import { LEGAL_SLUGS, LegalSlug } from "@/i18n/legalDictionary";

export function generateStaticParams() {
  return LEGAL_SLUGS.map((page) => ({ page }));
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!LEGAL_SLUGS.includes(page as LegalSlug)) notFound();
  return <LegalContent slug={page as LegalSlug} />;
}
