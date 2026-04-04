"use server";

import { signIn, signOut } from "@/lib/auth.config";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limiter";
import { headers } from "next/headers";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string> {
  try {
    const email = formData.get("email") as string;
    const headersList = await headers();
    const identifier =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    const rateLimitResult = rateLimit(`auth:${identifier}`);
    if (!rateLimitResult.success) {
      return `Too many requests. Please try again in ${Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)} seconds.`;
    }

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    // Check user role and redirect accordingly
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user?.role === "ADMIN") {
      return "AdminSuccess";
    }

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong.";
      }
    }
    return "Something went wrong.";
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const headersList = await headers();
  const identifier =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";

  // Apply rate limiting
  const rateLimitResult = rateLimit(`register:${identifier}`);
  if (!rateLimitResult.success) {
    return `Too many requests. Please try again in ${Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)} seconds.`;
  }

  const validated = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return validated.error.format()._errors?.[0] || "Validation failed";
  }

  const { name, email, password } = validated.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "Email already registered.";
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      return "Authentication failed.";
    }
    return "Something went wrong.";
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}
