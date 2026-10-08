import Link from "next/link";
import { notFound } from "next/navigation";
import { products, CURRENCY } from "@/data/products";

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

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← უკან
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="flex h-72 items-center justify-center rounded-xl bg-gray-100 text-9xl">
          {product.emoji}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl">
            <span className="font-bold">
              {product.price} {CURRENCY}
            </span>{" "}
            <span className="text-lg text-gray-400 line-through">
              {product.oldPrice} {CURRENCY}
            </span>
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <button className="mt-6 rounded-lg bg-black px-6 py-3 text-white">
            კალათაში დამატება
          </button>
        </div>
      </div>
    </main>
  );
}
