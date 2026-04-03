"use client";

import { useLanguage } from "@/lib/i18n";

export default function AdminFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Smart Crypto Admin Panel.{" "}
            {t.admin.allRightsReserved || "All rights reserved."}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/dashboard"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t.admin.userDashboard}
            </a>
            <a
              href="/about"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t.admin.about}
            </a>
            <a
              href="mailto:admin@smartcrypto.com"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t.admin.support}
            </a>
          </div>

          {/* Version */}
          <div className="text-xs text-gray-400">{t.admin.version}</div>
        </div>
      </div>
    </footer>
  );
}
