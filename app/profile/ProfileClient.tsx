"use client";

import { User, Badge } from "@prisma/client";
import { checkAndAwardBadges } from "@/app/actions/badges";
import { useState, useEffect } from "react";
import { UserBadgeWithBadge } from "@/types";
import { useLanguage } from "@/lib/i18n";

interface ProfileClientProps {
  user: User;
  stats: {
    lessonsCompleted: number;
    certificatesEarned: number;
    quizzesPassed: number;
    quizzesTotal: number;
  };
  badges: {
    earned: UserBadgeWithBadge[];
    available: Badge[];
  };
  userId: string;
}

export default function ProfileClient({
  user,
  stats,
  badges,
  userId,
}: ProfileClientProps) {
  const { t } = useLanguage();
  const [earnedBadges] = useState(badges.earned);
  const [availableBadges] = useState(badges.available);

  useEffect(() => {
    // Check for new badges on mount
    checkAndAwardBadges(userId).then((result) => {
      if (result.success && (result.awarded || 0) > 0) {
        // Refresh badges
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  }, [userId]);

  const totalBadges = earnedBadges.length + availableBadges.length;
  const progress =
    totalBadges > 0 ? Math.round((earnedBadges.length / totalBadges) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl text-white font-bold">
            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name || t.profile.unnamedUser}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {t.profile.memberSince}{" "}
              {new Date(user.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {user.role === "ADMIN" && (
              <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {t.profile.admin}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="📚"
          label={t.profile.lessonsCompleted}
          value={stats.lessonsCompleted}
          color="blue"
        />
        <StatCard
          icon="🎓"
          label={t.profile.certificatesEarned}
          value={stats.certificatesEarned}
          color="purple"
        />
        <StatCard
          icon="📝"
          label={t.profile.quizzesPassed}
          value={stats.quizzesPassed}
          color="green"
        />
        <StatCard
          icon="🏆"
          label={t.profile.badgesEarned}
          value={earnedBadges.length}
          color="yellow"
        />
      </div>

      {/* Badge Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t.profile.badgeProgress}
        </h2>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">
              {earnedBadges.length} {t.profile.from}{" "}
              {earnedBadges.length + availableBadges.length} {t.profile.badges}
            </span>
            <span className="font-semibold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-linear-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.profile.earnedBadges}
        </h2>

        {earnedBadges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-gray-600 mb-2">{t.profile.noBadges}</p>
            <p className="text-sm text-gray-500">
              {t.profile.completeLessonsToUnlock}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((ub, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 text-center hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-2">{ub.badge.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {ub.badge.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {ub.badge.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(ub.earnedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.profile.availableBadges}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div
        className={`w-12 h-12 ${colors[color]} rounded-full flex items-center justify-center text-2xl mb-3`}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
