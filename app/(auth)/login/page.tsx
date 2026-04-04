import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = await auth();

  // If user is already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
