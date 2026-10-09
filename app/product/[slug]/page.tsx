import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
