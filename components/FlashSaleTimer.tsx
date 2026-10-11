"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

export default function FlashSaleTimer() {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-4 text-white shadow-lg sm:p-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <p className="text-xs font-bold tracking-wider uppercase sm:text-sm">
            ⚡ {t("flashSaleTitle")}
          </p>
          <p className="mt-1 text-xs opacity-90 sm:text-sm">
            {t("flashSaleSubtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 text-center font-mono text-lg font-bold sm:text-xl">
          <div className="rounded-xl bg-black/30 px-3 py-2">
            <span>{format(timeLeft.hours)}</span>
            <span className="block text-[10px] font-normal uppercase opacity-75">
              Hours
            </span>
          </div>
          <span>:</span>
          <div className="rounded-xl bg-black/30 px-3 py-2">
            <span>{format(timeLeft.minutes)}</span>
            <span className="block text-[10px] font-normal uppercase opacity-75">
              Mins
            </span>
          </div>
          <span>:</span>
          <div className="rounded-xl bg-black/30 px-3 py-2">
            <span>{format(timeLeft.seconds)}</span>
            <span className="block text-[10px] font-normal uppercase opacity-75">
              Secs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
