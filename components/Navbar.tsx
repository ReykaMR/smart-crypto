"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoutButton from "./LogoutButton";
import { useLanguage } from "@/lib/i18n";

interface Session {
  user?: {
    name?: string | null;
    role?: "USER" | "ADMIN";
  } | null;
}

export default function Navbar({ session }: { session: Session | null }) {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Smart Crypto Home"
          >
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-900">
              Smart Crypto
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {session ? (
              <>
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.dashboard}
                  </Link>
                  <Link
                    href="/glossary"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.glossary}
                  </Link>
                  <Link
                    href="/simulation"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.simulation}
                  </Link>
                  <Link
                    href="/certificates"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.certificates}
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    👤 {session.user?.name?.split(" ")[0] || t.nav.profile}
                    {session.user?.role === "ADMIN" && (
                      <span className="ml-1 text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded">
                        {t.nav.admin}
                      </span>
                    )}
                  </Link>
                  {session.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="hidden sm:inline-flex items-center gap-1 bg-linear-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm"
                      aria-label="Go to Admin Panel"
                    >
                      <span>⚙️</span>
                      <span>{t.nav.adminPanel}</span>
                    </Link>
                  )}
                  <LogoutButton />
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <MobileMenu session={session} />
                </div>
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href="/glossary"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.glossary}
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.about}
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all text-sm sm:text-base"
                  >
                    {t.nav.register}
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="sm:hidden">
                  <MobileMenu session={session} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <LanguageSwitcher />
          </div>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.dashboard}
              </Link>
              <Link
                href="/glossary"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.glossary}
              </Link>
              <Link
                href="/simulation"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.simulation}
              </Link>
              <Link
                href="/certificates"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.certificates}
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200"
                  onClick={() => setIsOpen(false)}
                >
                  ⚙️ {t.nav.adminPanel}
                </Link>
              )}
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                👤 {t.nav.profile}{" "}
                {session.user?.role === "ADMIN" && `(${t.nav.admin})`}
              </Link>
              <div className="border-t border-gray-100 my-2">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/glossary"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.glossary}
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
