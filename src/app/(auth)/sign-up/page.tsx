import { AuthPageGuard } from "@/components/auth/auth-page-guard";
import { SignUpForm } from "@/components/auth/sign-up-form";
export default function SignUpPage() { return <AuthPageGuard><SignUpForm /></AuthPageGuard>; }