import React from "react";

interface AdminStatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}

export default function AdminStatsCard({
  icon: Icon,
  label,
  value,
  color,
}: AdminStatsCardProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    pink: "bg-pink-100 text-pink-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 ${colors[color]} rounded-xl flex items-center justify-center mb-2 sm:mb-3`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900">
        {value.toLocaleString()}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 truncate">{label}</div>
    </div>
  );
}
