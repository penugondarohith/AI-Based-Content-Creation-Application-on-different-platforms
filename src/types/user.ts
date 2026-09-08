export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  accountType?: "PERSONAL" | "GUEST";
  profilePicture?: string;
  password?: string;
  createdAt: string;
}