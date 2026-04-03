"use client";

import { useLanguage } from "@/lib/i18n";

interface Activity {
  user: {
    name: string | null;
    email: string;
  };
  lesson: {
    title: string;
  } | null;
  lastAccessed: Date;
}

interface AdminRecentActivityProps {
  activities: Activity[];
}

export default function AdminRecentActivity({
  activities,
}: AdminRecentActivityProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="p-3 sm:p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-900">
                  <span className="font-medium">
                    {activity.user.name || activity.user.email}
                  </span>{" "}
                  {t.admin.completedLesson}{" "}
                  <span className="font-medium text-blue-600 truncate">
                    {activity.lesson?.title}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.lastAccessed).toLocaleString("id-ID", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600">
          {t.admin.recentActivityDesc}
        </p>
      </div>
    </div>
  );
}
