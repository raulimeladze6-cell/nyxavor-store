"use client";

import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { accountText } from "@/i18n/accountDictionary";
import { SITE } from "@/data/site";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-pink-500 focus:outline-none";

export default function AuthModal() {
  const { modal, openAuth, closeAuth, signIn, signUp, configured } = useAuth();
  const { lang } = useI18n();
  const a = accountText[lang];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    setError("");
    setInfo("");
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeAuth]);

  if (!modal) return null;
  const isLogin = modal === "login";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setBusy(true);
    setError("");
    setInfo("");
    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);
    setBusy(false);

    if (result.error) {
      setError(a[result.error]);
      return;
    }
    if (result.needsConfirm) {
      setInfo(a.confirmEmail);
      return;
    }
    closeAuth();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={closeAuth}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">
            {isLogin ? a.loginTitle : a.registerTitle}
          </h2>
          <button
            onClick={closeAuth}
            aria-label={a.close}
            className="rounded-full px-2 py-1 text-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {!configured ? (
          <p className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            {a.notConfigured}
          </p>
        ) : (
          <form key={modal} onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium">
              {a.email}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-medium">
              {a.password}
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className={inputClass}
              />
              {!isLogin && (
                <span className="mt-1 block text-xs font-normal text-gray-500">
                  {a.passwordHint}
                </span>
              )}
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                {error}
              </p>
            )}
            {info && (
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                {info}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg disabled:opacity-60"
            >
              {busy ? a.working : isLogin ? a.signIn : a.register}
            </button>

            <button
              type="button"
              onClick={() => openAuth(isLogin ? "register" : "login")}
              className="w-full text-center text-sm font-medium text-pink-600 hover:underline"
            >
              {isLogin ? a.noAccount : a.haveAccount}
            </button>

            {SITE.demo && (
              <p className="text-xs text-yellow-700">{a.demoAuthNote}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
