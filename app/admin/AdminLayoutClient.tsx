"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminFooter from "./AdminFooter";
import { User } from "next-auth";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: User;
  stats: [number, number, number, number];
}

export default function AdminLayoutClient({
  children,
  user,
  stats,
}: AdminLayoutClientProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Responsive */}
      <AdminSidebar
        stats={stats}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar - Responsive */}
        <AdminTopbar
          user={user}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Scrollable content - Responsive padding */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Footer - Responsive */}
        <AdminFooter />
      </div>
    </div>
  );
}
