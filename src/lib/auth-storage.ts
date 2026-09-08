import type { User } from "@/types/user";

export const AUTH_STORAGE_KEYS = { users: "contentforge_users", session: "contentforge_session" } as const;

function canUseStorage() { return typeof window !== "undefined" && typeof window.localStorage !== "undefined"; }
function readUsers(): User[] { if (!canUseStorage()) return []; try { return JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEYS.users) ?? "[]") as User[]; } catch { return []; } }
export function getStoredUsers() { return readUsers(); }
export function saveStoredUsers(users: User[]) { if (!canUseStorage()) throw new Error("Local storage is unavailable in this browser."); window.localStorage.setItem(AUTH_STORAGE_KEYS.users, JSON.stringify(users)); }
export function getStoredSession(): User | null { if (!canUseStorage()) return null; try { const session = window.localStorage.getItem(AUTH_STORAGE_KEYS.session); return session ? JSON.parse(session) as User : null; } catch { return null; } }
export function saveStoredSession(user: User) { if (!canUseStorage()) throw new Error("Local storage is unavailable in this browser."); window.localStorage.setItem(AUTH_STORAGE_KEYS.session, JSON.stringify(user)); }
export function clearStoredSession() { if (canUseStorage()) window.localStorage.removeItem(AUTH_STORAGE_KEYS.session); }