import type { User } from "@/types/user";
import { clearStoredSession, getStoredSession, getStoredUsers, saveStoredSession, saveStoredUsers } from "@/lib/auth-storage";

export interface AuthService {
  signUp(input: { name: string; email: string; age: number; password: string }): User;
  signIn(email: string, password: string): User;
  continueAsGuest(): User;
  updateProfile(userId: string, update: Partial<Pick<User, "name" | "email" | "age" | "profilePicture">>): User;
  signOut(): void;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  emailExists(email: string): boolean;
}

export class LocalAuthService implements AuthService {
  signUp(input: { name: string; email: string; age: number; password: string }) { const normalizedEmail = input.email.trim().toLowerCase(); if (this.emailExists(normalizedEmail)) throw new Error("An account with this email already exists."); const user: User = { id: `user_${Date.now()}`, name: input.name.trim(), email: normalizedEmail, age: input.age, accountType: "PERSONAL", password: input.password, createdAt: new Date().toISOString() }; saveStoredUsers([...getStoredUsers(), user]); saveStoredSession(user); return user; }
  signIn(email: string, password: string) { const user = getStoredUsers().find((candidate) => candidate.email === email.trim().toLowerCase() && candidate.password === password); if (!user) throw new Error("Invalid email or password."); saveStoredSession(user); return user; }
  continueAsGuest() { const user: User = { id: `guest_${Date.now()}`, name: "Guest User", email: "guest@local.contentforge", age: 0, accountType: "GUEST", createdAt: new Date().toISOString() }; saveStoredSession(user); return user; }
  updateProfile(userId: string, update: Partial<Pick<User, "name" | "email" | "age" | "profilePicture">>) { const session = getStoredSession(); if (!session || session.id !== userId || session.accountType === "GUEST") throw new Error("Guest profiles cannot be saved. Create an account to keep your profile."); const nextUser = { ...session, ...update, email: update.email?.trim().toLowerCase() ?? session.email }; const users = getStoredUsers().map((user) => user.id === userId ? nextUser : user); saveStoredUsers(users); saveStoredSession(nextUser); return nextUser; }
  signOut() { const session = getStoredSession(); if (session?.accountType === "GUEST" && typeof window !== "undefined") { window.localStorage.removeItem("contentforge_generated_content"); window.localStorage.removeItem("contentforge_content_strategy"); } clearStoredSession(); }
  getCurrentUser() { return getStoredSession(); }
  isAuthenticated() { return Boolean(this.getCurrentUser()); }
  emailExists(email: string) { return getStoredUsers().some((user) => user.email === email.trim().toLowerCase()); }
}

export const authService: AuthService = new LocalAuthService();