"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  BookIcon,
  UsersIcon,
  CloseIcon,
} from "@/components/Icons";
import { useLanguage } from "@/lib/i18n";

interface AdminSidebarProps {
  stats: [number, number, number, number];
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  stats,
  isMobileOpen,
  setIsMobileOpen,
}: AdminSidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [users, courses] = stats;

  const menuItems = [
    {
      title: t.admin.dashboard,
      href: "/admin",
      icon: DashboardIcon,
      active: pathname === "/admin",
    },
    {
      title: t.admin.courses,
      href: "/admin/courses",
      icon: BookIcon,
      active: pathname.startsWith("/admin/courses"),
      count: courses,
    },
    {
      title: t.admin.users,
      href: "/admin/users",
      icon: UsersIcon,
      active: pathname.startsWith("/admin/users"),
      count: users,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-40
          w-72 lg:w-64
          bg-white border-r border-gray-200
          flex flex-col shadow-lg lg:shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          h-full lg:h-auto
        `}
      >
        {/* Topbar Area */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 truncate">Smart Crypto</h1>
              <p className="text-xs text-gray-500 truncate">
                {t.admin.adminPanel}
              </p>
            </div>
          </Link>

          {/* Close Button - in topbar */}
          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all -mr-2"
              aria-label={t.admin.toggleMenu}
            >
              <CloseIcon className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full shrink-0">
                      {item.count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Site */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-sm text-gray-700"
          >
            <span>←</span> {t.admin.backToDashboard}
          </Link>
        </div>
      </aside>
    </>
  );
}
