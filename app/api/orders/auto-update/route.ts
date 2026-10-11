import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Service Role ან ჩვეულებრივი Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const now = new Date();

    // 1. Pending -> Processing (თუ გასულია 2 საათზე მეტი)
    const twoHoursAgo = new Date(
      now.getTime() - 2 * 60 * 60 * 1000,
    ).toISOString();
    const { error: err1 } = await supabase
      .from("orders")
      .update({ status: "processing" })
      .eq("status", "pending")
      .lte("created_at", twoHoursAgo);

    // 2. Processing -> Shipped (თუ გასულია 24 საათზე მეტი)
    const twentyFourHoursAgo = new Date(
      now.getTime() - 24 * 60 * 60 * 1000,
    ).toISOString();
    const { error: err2 } = await supabase
      .from("orders")
      .update({ status: "shipped" })
      .eq("status", "processing")
      .lte("created_at", twentyFourHoursAgo);

    // 3. Shipped -> Completed (თუ გასულია 14 დღეზე მეტი)
    const fourteenDaysAgo = new Date(
      now.getTime() - 14 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const { error: err3 } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("status", "shipped")
      .lte("created_at", fourteenDaysAgo);

    if (err1 || err2 || err3) {
      return NextResponse.json(
        { success: false, errors: { err1, err2, err3 } },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order statuses updated automatically",
      timestamp: now.toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
