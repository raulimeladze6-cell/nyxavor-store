import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { SITE } from "@/data/site";

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // ბოტებისგან დაცვა: ადამიანი ამ ველს ვერ ხედავს და არ ავსებს
  if (str(data.website, 200)) {
    return NextResponse.json({ ok: true, orderId: "NX-OK" });
  }

  const name = str(data.name, 100);
  const email = str(data.email, 150);
  const phone = str(data.phone, 40);
  const country = str(data.country, 60);
  const city = str(data.city, 100);
  const postal = str(data.postal, 20);
  const address = str(data.address, 200);
  const notes = str(data.notes, 500);
  const lang = str(data.lang, 5);
  const currency = str(data.currency, 5);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !phone || !country || !city || !postal || !address) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // ფასებს ვითვლით სერვერზე, ბრაუზერიდან მოსულ ფასს არ ვენდობით
  const rawItems = Array.isArray(data.items) ? data.items.slice(0, 50) : [];
  const lines: string[] = [];
  let total = 0;

  for (const raw of rawItems) {
    const item = raw as { slug?: unknown; quantity?: unknown };
    const product = products.find((p) => p.slug === item.slug);
    const qty = Number(item.quantity);
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 99) {
      return NextResponse.json({ error: "invalid_items" }, { status: 400 });
    }
    const sum = product.price * qty;
    total += sum;
    lines.push(
      `- ${product.name.en} (${product.slug}) x ${qty} = $${sum.toFixed(2)}`,
    );
  }

  if (lines.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL;
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or ORDER_EMAIL");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const orderId = "NX-" + Date.now().toString(36).toUpperCase();
  const prefix = SITE.demo ? "[DEMO] " : "";

  const text = [
    `${prefix}New order ${orderId}`,
    "",
    "ITEMS",
    ...lines,
    "",
    `TOTAL: $${total.toFixed(2)} USD (shipping not included)`,
    "",
    "CUSTOMER",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "SHIPPING ADDRESS",
    `${address}`,
    `${city}, ${postal}`,
    `Country: ${country}`,
    "",
    `Notes: ${notes || "-"}`,
    `Customer language/currency: ${lang} / ${currency}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${SITE.name} <onboarding@resend.dev>`,
      to: [to],
      reply_to: email,
      subject: `${prefix}New order ${orderId} ($${total.toFixed(2)})`,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", res.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, orderId });
}
