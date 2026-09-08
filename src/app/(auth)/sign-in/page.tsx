import { AuthPageGuard } from "@/components/auth/auth-page-guard";
import { SignInForm } from "@/components/auth/sign-in-form";
export default function SignInPage() { return <AuthPageGuard><SignInForm /></AuthPageGuard>; }