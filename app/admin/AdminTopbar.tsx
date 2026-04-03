"use client";

import { User } from "next-auth";
import LogoutButton from "@/components/LogoutButton";
import { MenuIcon } from "@/components/Icons";
import { useLanguage } from "@/lib/i18n";

interface AdminTopbarProps {
  user: User;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function AdminTopbar({
  user,
  isMobileOpen,
  setIsMobileOpen,
}: AdminTopbarProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left Side - Mobile menu button + Page Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {!isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              aria-label={t.admin.toggleMenu}
            >
              <MenuIcon className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Page Title - Responsive */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {t.admin.adminDashboard}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 hidden xs:block">
              {t.admin.managePlatform}
            </p>
          </div>
        </div>

        {/* Right Side - Responsive */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User Info - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm sm:text-base">
              {user.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 hidden sm:block">
              <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                {user.name || t.admin.admin}
              </div>
              <div className="text-xs text-gray-500 truncate hidden md:block">
                {user.email}
              </div>
            </div>
          </div>

          {/* Logout - Responsive */}
          <div className="shrink-0">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
