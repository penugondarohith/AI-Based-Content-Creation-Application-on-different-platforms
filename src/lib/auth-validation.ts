export function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); }
export function validateName(name: string) { return name.trim().length >= 2; }
export function validateAge(age: string) { const value = Number(age); return Number.isInteger(value) && value >= 13 && value <= 100; }
export function validatePassword(password: string) { return password.length >= 8; }