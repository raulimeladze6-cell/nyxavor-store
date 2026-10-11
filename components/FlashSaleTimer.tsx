"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

export default function FlashSaleTimer() {
  const { lang } = useI18n();
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 15,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  // ენის მიხედვით ტექსტების ადაპტაცია
  const t = {
    ka: {
      title: "Flash Sale — დღის სპეციალური შეთავაზება",
      subtitle: "ფასდაკლება მოქმედებს მხოლოდ შეზღუდული რაოდენობით!",
      hours: "საათი",
      minutes: "წუთი",
      seconds: "წამი",
    },
    en: {
      title: "Flash Sale — Limited Time Offer",
      subtitle: "Discounts available while stock lasts!",
      hours: "Hours",
      minutes: "Mins",
      seconds: "Secs",
    },
  }[lang === "ka" ? "ka" : "en"];

  return (
    <div className="my-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 p-4 text-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-3xl animate-bounce">⚡</span>
          <div>
            <h3 className="text-lg font-black uppercase tracking-wider">
              {t.title}
            </h3>
            <p className="text-xs text-white/80">{t.subtitle}</p>
          </div>
        </div>

        {/* ტაიმერი */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="rounded-lg bg-black/40 px-3 py-1.5 font-mono text-lg font-bold backdrop-blur-sm border border-white/10">
              {formatTime(timeLeft.hours)}
            </span>
            <span className="text-[10px] uppercase text-white/70 mt-1 font-semibold">
              {t.hours}
            </span>
          </div>
          <span className="text-xl font-bold pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="rounded-lg bg-black/40 px-3 py-1.5 font-mono text-lg font-bold backdrop-blur-sm border border-white/10">
              {formatTime(timeLeft.minutes)}
            </span>
            <span className="text-[10px] uppercase text-white/70 mt-1 font-semibold">
              {t.minutes}
            </span>
          </div>
          <span className="text-xl font-bold pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="rounded-lg bg-black/40 px-3 py-1.5 font-mono text-lg font-bold backdrop-blur-sm border border-white/10">
              {formatTime(timeLeft.seconds)}
            </span>
            <span className="text-[10px] uppercase text-white/70 mt-1 font-semibold">
              {t.seconds}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
