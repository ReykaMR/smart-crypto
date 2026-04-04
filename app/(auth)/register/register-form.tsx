"use client";

import { register } from "@/app/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined,
  );

  // Redirect on successful registration
  useEffect(() => {
    if (errorMessage === "Success") {
      router.push("/dashboard");
      router.refresh();
    }
  }, [errorMessage, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 my-8">
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t.auth.register.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {t.auth.register.subtitle}
          </p>
        </div>

        <form action={formAction} className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.auth.register.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={isPending}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-sm sm:text-base"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.auth.register.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-sm sm:text-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.auth.register.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isPending}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-sm sm:text-base"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              {t.auth.register.passwordHint}
            </p>
          </div>

          {errorMessage && errorMessage !== "Success" && (
            <div
              className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isPending ? t.auth.register.loading : t.auth.register.submit}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          {t.auth.register.hasAccount}{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t.auth.register.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
