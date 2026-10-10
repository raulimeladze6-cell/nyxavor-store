import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { SITE } from "@/data/site";
import { createClient } from "@supabase/supabase-js";

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // ბოტებისგან დაცვა
  if (str(data.website, 200)) {
    return NextResponse.json({ ok: true, orderId: "NX-OK" });
  }

  const userId = str(data.userId, 100);
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

  // ფასების დათვლა და პროდუქტების შეგროვება სერვერზე
  const rawItems = Array.isArray(data.items) ? data.items.slice(0, 50) : [];
  const lines: string[] = [];
  const verifiedItems = [];
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

    verifiedItems.push({
      slug: product.slug,
      name: product.name.en,
      price: product.price,
      quantity: qty,
    });

    lines.push(
      `- ${product.name.en} (${product.slug}) x ${qty} = $${sum.toFixed(2)}`,
    );
  }

  if (lines.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const orderId = "NX-" + Date.now().toString(36).toUpperCase();

  // 1. შეკვეთის და პროდუქტების ჩწერა Supabase ბაზაში
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase.from("orders").insert([
      {
        user_id: userId || null,
        customer_name: name,
        email: email,
        phone: phone,
        address: `${address}, ${city}, ${postal}, ${country}`,
        notes: notes,
        total_amount: total,
        status: "pending",
        items: verifiedItems, // <--- აი აქ ემატება პროდუქტები jsonb სვეტში!
      },
    ]);

    if (dbError) {
      console.error("--- SUPABASE DB INSERT ERROR ---", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }
  }

  // 2. ელფოსტის გაგზავნა Resend-ით
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL;

  if (apiKey && to) {
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

    await fetch("https://api.resend.com/emails", {
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
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, orderId });
}
