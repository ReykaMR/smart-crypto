import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
  const session = await auth();

  // If user is already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
