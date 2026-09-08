"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/user";
import { authService } from "@/services/auth-service";

type AuthContextValue = { user: User | null; isAuthenticated: boolean; isLoading: boolean; signUp: (input: { name: string; email: string; age: number; password: string }) => User; signIn: (email: string, password: string) => User; signOut: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User | null>(null); const [isLoading, setIsLoading] = useState(true); useEffect(() => { const timer = window.setTimeout(() => { setUser(authService.getCurrentUser()); setIsLoading(false); }, 0); return () => window.clearTimeout(timer); }, []); const signUp = useCallback((input: { name: string; email: string; age: number; password: string }) => { const nextUser = authService.signUp(input); setUser(nextUser); return nextUser; }, []); const signIn = useCallback((email: string, password: string) => { const nextUser = authService.signIn(email, password); setUser(nextUser); return nextUser; }, []); const signOut = useCallback(() => { authService.signOut(); setUser(null); }, []); const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isLoading, signUp, signIn, signOut }), [user, isLoading, signUp, signIn, signOut]); return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; }
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }