import type { User } from "@/types/user";
import { clearStoredSession, getStoredSession, getStoredUsers, saveStoredSession, saveStoredUsers } from "@/lib/auth-storage";

export interface AuthService {
  signUp(input: { name: string; email: string; age: number; password: string }): User;
  signIn(email: string, password: string): User;
  signOut(): void;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  emailExists(email: string): boolean;
}

export class LocalAuthService implements AuthService {
  signUp(input: { name: string; email: string; age: number; password: string }) { const normalizedEmail = input.email.trim().toLowerCase(); if (this.emailExists(normalizedEmail)) throw new Error("An account with this email already exists."); const user: User = { id: `user_${Date.now()}`, name: input.name.trim(), email: normalizedEmail, age: input.age, password: input.password, createdAt: new Date().toISOString() }; saveStoredUsers([...getStoredUsers(), user]); saveStoredSession(user); return user; }
  signIn(email: string, password: string) { const user = getStoredUsers().find((candidate) => candidate.email === email.trim().toLowerCase() && candidate.password === password); if (!user) throw new Error("Invalid email or password."); saveStoredSession(user); return user; }
  signOut() { clearStoredSession(); }
  getCurrentUser() { return getStoredSession(); }
  isAuthenticated() { return Boolean(this.getCurrentUser()); }
  emailExists(email: string) { return getStoredUsers().some((user) => user.email === email.trim().toLowerCase()); }
}

export const authService: AuthService = new LocalAuthService();