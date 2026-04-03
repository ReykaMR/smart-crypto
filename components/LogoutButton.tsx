"use client";

import { logout } from "@/app/actions/auth";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-all disabled:opacity-50"
      title={t.nav.logout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10 9a1 1 0 01-1 1H6a1 1 0 010-2h6a1 1 0 011 1zm-2-3a1 1 0 01-1 1H6a1 1 0 010-2h4a1 1 0 011 1zm4-6H3v12h12V4z"
          clipRule="evenodd"
        />
        <path d="M15 7a1 1 0 011 1v1a1 1 0 11-2 0V8a1 1 0 011-1zM9 13a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />
      </svg>
      <span className="hidden sm:inline">
        {isLoading ? "..." : t.nav.logout}
      </span>
    </button>
  );
}
