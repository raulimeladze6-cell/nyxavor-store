"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";

export default function SpinWheelModal() {
  const { lang } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    async function checkEligibility() {
      // 1. ვამოწმებთ LocalStorage & Cookie-ს
      const localSpun = localStorage.getItem("nyxavor_spun_wheel");
      const cookieSpun = document.cookie.includes("nyxavor_spun_wheel=true");

      if (localSpun || cookieSpun) return;

      // 2. თუ ავტორიზებულია, ვამოწმებთ Supabase ბაზას
      if (user) {
        const supabase = createClient();
        const { data } = await supabase
          .from("profiles")
          .select("has_spun_wheel")
          .eq("id", user.id)
          .single();

        if (data?.has_spun_wheel) {
          // თუ ბაზაში უწერია რომ უკვე დაატრიალა, LocalStorage-საც აღვადგენთ
          localStorage.setItem("nyxavor_spun_wheel", "true");
          return;
        }
      }

      // თუ არცერთგან არ უფიქსირდება დატრიალება, 4 წამში ვუხსნით
      const timer = setTimeout(() => setOpen(true), 4000);
      return () => clearTimeout(timer);
    }

    checkEligibility();
  }, [user]);

  const spin = async () => {
    if (spinning || won) return;
    setSpinning(true);

    const targetDegree = 1800 + 45;
    setRotation(targetDegree);

    setTimeout(async () => {
      setSpinning(false);
      const prize =
        lang === "ka"
          ? "10% ფასდაკლება (კოდი: NYX10)"
          : "10% OFF (Code: NYX10)";
      setWon(prize);

      // 1. ვინახავთ LocalStorage-ში
      const existingCoupons = JSON.parse(
        localStorage.getItem("nyxavor_coupons") || "[]",
      );
      const newCoupon = {
        code: "NYX10",
        discount: "10%",
        title: "Spin Wheel Reward",
        active: true,
      };
      if (!existingCoupons.some((c: any) => c.code === "NYX10")) {
        existingCoupons.push(newCoupon);
        localStorage.setItem(
          "nyxavor_coupons",
          JSON.stringify(existingCoupons),
        );
      }

      localStorage.setItem("nyxavor_spun_wheel", "true");

      // 2. ვინახავთ Cookie-ში 1 წლით
      document.cookie = "nyxavor_spun_wheel=true; max-age=31536000; path=/";

      // 3. თუ ავტორიზებულია, ვინახავთ Supabase ბაზაში სამუდამოდ
      if (user) {
        const supabase = createClient();
        await supabase
          .from("profiles")
          .update({ has_spun_wheel: true })
          .eq("id", user.id);
      }
    }, 4500);
  };

  if (!open) return null;

  const text = {
    ka: {
      title: "🎁 დაატრიალე და მოიგე!",
      subtitle: "გამოსცადე იღბალი და მიიღე ექსკლუზიური საჩუქარი",
      spinBtn: "დაატრიალე!",
      congrats: "გილოცავ! 🎉",
      useNow: "გამოყენება",
    },
    en: {
      title: "🎁 Spin & Win!",
      subtitle: "Test your luck and win an exclusive reward",
      spinBtn: "SPIN NOW!",
      congrats: "Congratulations! 🎉",
      useNow: "Use Discount",
    },
  }[lang === "ka" ? "ka" : "en"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-3xl bg-gray-900 border border-gray-800 p-6 text-center text-white shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white font-bold text-lg"
        >
          ✕
        </button>

        <h3 className="text-xl font-black text-pink-500">{text.title}</h3>
        <p className="mt-1 text-xs text-gray-400">{text.subtitle}</p>

        <div className="relative my-6 mx-auto flex h-52 w-52 items-center justify-center">
          <div className="absolute -top-3 z-20 text-3xl text-yellow-400 drop-shadow-md">
            ▼
          </div>

          <div
            className="h-full w-full rounded-full border-4 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-[4500ms] cubic-bezier(0.15,0.9,0.2,1)"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                #ec4899 0deg 90deg, 
                #f97316 90deg 180deg, 
                #eab308 180deg 270deg, 
                #a855f7 270deg 360deg
              )`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 rotate-0 text-white font-extrabold">
                10% OFF
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white font-extrabold">
                FREE SHIP
              </span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-180 text-white font-extrabold">
                5% OFF
              </span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-white font-extrabold">
                15% OFF
              </span>
            </div>
          </div>

          <div className="absolute h-12 w-12 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center font-black text-pink-500 shadow-md">
            NYX
          </div>
        </div>

        {won ? (
          <div className="space-y-3 animate-in zoom-in-50 duration-300">
            <p className="text-sm font-bold text-yellow-400">{text.congrats}</p>
            <div className="rounded-xl bg-pink-500/10 border border-pink-500/30 p-2.5 text-xs text-pink-300 font-mono font-bold">
              {won}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 py-3 font-bold text-white shadow-lg hover:brightness-110"
            >
              {text.useNow}
            </button>
          </div>
        ) : (
          <button
            onClick={spin}
            disabled={spinning}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 py-3 font-black text-white shadow-lg hover:brightness-110 disabled:opacity-50"
          >
            {spinning ? "..." : text.spinBtn}
          </button>
        )}
      </div>
    </div>
  );
}
