"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
export function ProtectedRoute({ children }: { children: React.ReactNode }) { const { isAuthenticated, isLoading } = useAuth(); const router = useRouter(); const pathname = usePathname(); useEffect(() => { if (!isLoading && !isAuthenticated) router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`); }, [isAuthenticated, isLoading, pathname, router]); if (isLoading || !isAuthenticated) return <div className="flex min-h-screen items-center justify-center bg-background"><div className="size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" /></div>; return <>{children}</>; }