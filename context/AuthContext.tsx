"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export type AuthMode = "login" | "register";
export type AuthError =
  | "authInvalid"
  | "authExists"
  | "authWeak"
  | "authUnconfirmed"
  | "authGeneric"
  | "notConfigured";
export type AuthResult = { error?: AuthError; needsConfirm?: boolean };

type AuthContextType = {
  user: User | null;
  configured: boolean;
  modal: AuthMode | null;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function mapError(message: string): AuthError {
  const m = message.toLowerCase();
  if (m.includes("not confirmed")) return "authUnconfirmed";
  if (m.includes("invalid login") || m.includes("invalid credentials"))
    return "authInvalid";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "authExists";
  if (m.includes("password")) return "authWeak";
  return "authGeneric";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [modal, setModal] = useState<AuthMode | null>(null);

  const supabase = createClient();

  const configured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      setUser(data.session?.user ?? null);
    });
    const { data } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setUser(session?.user ?? null);
      },
    );
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const openAuth = useCallback(
    (mode: AuthMode = "login") => setModal(mode),
    [],
  );
  const closeAuth = useCallback(() => setModal(null), []);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    if (!supabase) return { error: "notConfigured" };
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error ? { error: mapError(error.message) } : {};
  };

  const signUp = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    if (!supabase) return { error: "notConfigured" };
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: mapError(error.message) };
    return data.session ? {} : { needsConfirm: true };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        configured,
        modal,
        openAuth,
        closeAuth,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth უნდა გამოიყენო AuthProvider-ის შიგნით");
  return ctx;
}
