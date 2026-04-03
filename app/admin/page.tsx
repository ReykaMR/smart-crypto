import { prisma } from "@/lib/prisma";
import AdminStatsCard from "./AdminStatsCard";
import AdminRecentUsers from "./AdminRecentUsers";
import AdminRecentActivity from "./AdminRecentActivity";
import {
  UsersIcon,
  BookIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
} from "@/components/Icons";

export default async function AdminDashboardPage() {
  // Get all statistics
  const [
    totalUsers,
    totalCourses,
    totalGlossaryTerms,
    totalLessonsCompleted,
    totalCertificates,
    totalQuizAttempts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.glossaryTerm.count(),
    prisma.userProgress.count({ where: { isCompleted: true } }),
    prisma.certificate.count(),
    prisma.quizAttempt.count(),
  ]);

  // Get recent users
  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  // Get recent activity
  const recentActivity = await prisma.userProgress.findMany({
    take: 10,
    orderBy: { lastAccessed: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      lesson: { select: { title: true } },
    },
  });

  const stats = [
    {
      icon: UsersIcon,
      label: "Total Users",
      value: totalUsers,
      color: "blue",
    },
    {
      icon: BookIcon,
      label: "Total Courses",
      value: totalCourses,
      color: "purple",
    },
    {
      icon: DocumentTextIcon,
      label: "Glossary Terms",
      value: totalGlossaryTerms,
      color: "green",
    },
    {
      icon: CheckCircleIcon,
      label: "Lessons Completed",
      value: totalLessonsCompleted,
      color: "yellow",
    },
    {
      icon: AcademicCapIcon,
      label: "Certificates",
      value: totalCertificates,
      color: "pink",
    },
    {
      icon: QuestionMarkCircleIcon,
      label: "Quiz Attempts",
      value: totalQuizAttempts,
      color: "indigo",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card - Responsive */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-sm sm:text-base text-blue-100">
          Here&apos;s what&apos;s happening on your platform today.
        </p>
      </div>

      {/* Statistics Grid - Fully Responsive */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <AdminStatsCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Recent Activity & Users - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Users */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Recent Users
          </h2>
          <AdminRecentUsers users={recentUsers} />
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <AdminRecentActivity activities={recentActivity} />
        </div>
      </div>

      {/* Quick Actions - Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <a
            href="/admin/courses"
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group"
          >
            <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
              📚
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              Manage Courses
            </span>
          </a>
          <a
            href="/admin/users"
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all group"
          >
            <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
              👥
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              View Users
            </span>
          </a>
          <a
            href="/glossary"
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all group"
          >
            <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
              📖
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              View Glossary
            </span>
          </a>
          <a
            href="/dashboard"
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group"
          >
            <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
              🌐
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              View Site
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
