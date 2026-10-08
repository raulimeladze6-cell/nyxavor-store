import Link from "next/link";
import { products, CURRENCY } from "@/data/products";

export default function Home() {
  return (
    <>
      <section className="bg-black px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">გაჯეტები და აქსესუარები</h1>
        <p className="mt-3 text-gray-300">საუკეთესო ფასები, სწრაფი მიწოდება</p>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">პროდუქტები</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              className="rounded-xl border p-4 transition hover:shadow-lg"
            >
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-6xl">
                {p.emoji}
              </div>
              <h3 className="mt-3 font-medium">{p.name}</h3>
              <p className="mt-1">
                <span className="font-bold">
                  {p.price} {CURRENCY}
                </span>{" "}
                <span className="text-sm text-gray-400 line-through">
                  {p.oldPrice} {CURRENCY}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t px-6 py-6 text-center text-sm text-gray-500">
        © 2026 Nyxavor. ყველა უფლება დაცულია.
      </footer>
    </>
  );
}
