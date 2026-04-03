"use client";

import { useLanguage } from "@/lib/i18n";

interface AdminUsersClientProps {
  users: {
    id: string;
    name: string | null;
    email: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
    _count: {
      progress: number;
      certificates: number;
      quizAttempts: number;
    };
  }[];
  stats: [number, number, number];
}

export default function AdminUsersClient({
  users,
  stats,
}: AdminUsersClientProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t.admin.users}</h1>
        <p className="text-gray-600 mt-1">
          {t.admin.manageUsers || "View and manage all users"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats[0]}</div>
          <div className="text-gray-600">{t.admin.totalUsers}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{stats[1]}</div>
          <div className="text-gray-600">
            {t.admin.adminUsers || "Admin Users"}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats[2]}</div>
          <div className="text-gray-600">
            {t.admin.regularUsers || "Regular Users"}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.user}
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.role}
                </th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.progress || "Progress"}
                </th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.certificates}
                </th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.quizzes || "Quizzes"}
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.admin.joined}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name?.[0]?.toUpperCase() ||
                          user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name || t.admin.unnamedUser}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {user._count.progress}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {user._count.certificates}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {user._count.quizAttempts}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
