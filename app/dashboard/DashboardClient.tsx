"use client";

import {
  User,
  Course,
  CourseModule,
  Lesson,
  UserProgress,
} from "@prisma/client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Translation } from "@/lib/i18n";

interface DashboardClientProps {
  user: User;
  userProgress: UserProgress[];
  courses: (Course & {
    modules: (CourseModule & { lessons: Lesson[] })[];
    progress: UserProgress[];
  })[];
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: {
    lessonId: string;
    lesson: { title: string; slug: string; moduleId: string };
  } | null;
  translations: Translation;
}

export default function DashboardClient({
  user,
  userProgress,
  courses,
  overallProgress,
  completedLessons,
  totalLessons,
  lastAccessed,
  translations,
}: DashboardClientProps) {
  const { t } = useLanguage();
  const i18n = translations || t;

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {i18n.dashboard.welcome}, {user.name || i18n.dashboard.learner}!
        </h1>
        <p className="text-gray-600">{i18n.dashboard.subtitle}</p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">
              {i18n.dashboard.progress}
            </h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {overallProgress}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedLessons} {i18n.dashboard.of} {totalLessons}{" "}
            {i18n.dashboard.lessons.toLowerCase()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">
              {i18n.dashboard.lessons}
            </h3>
            <span className="text-2xl">✅</span>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {completedLessons}
          </div>
          <p className="text-sm text-gray-600">{i18n.dashboard.keepGoing}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">
              {i18n.dashboard.certificates}
            </h3>
            <span className="text-2xl">🎓</span>
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
          <p className="text-sm text-gray-600">{i18n.certificates.earned}</p>
        </div>
      </div>

      {/* Continue Learning */}
      {lastAccessed?.lesson && (
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-xl font-semibold mb-4">
            {i18n.dashboard.continueLearning}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-1">
                {i18n.dashboard.lastAccessed}
              </p>
              <p className="font-medium text-lg">{lastAccessed.lesson.title}</p>
            </div>
            <Link
              href={`/learn/course/${lastAccessed.lesson.slug}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
            >
              {i18n.dashboard.continue}
            </Link>
          </div>
        </div>
      )}

      {/* Courses */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {i18n.dashboard.yourCourses}
        </h2>
        <div className="space-y-6">
          {courses.map((course) => {
            const courseProgress = course.progress.filter(
              (p) => p.isCompleted,
            ).length;
            const totalCourseLessons = course.modules.reduce(
              (a, m) => a + m.lessons.length,
              0,
            );
            const progressPercent =
              totalCourseLessons > 0
                ? Math.round((courseProgress / totalCourseLessons) * 100)
                : 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {progressPercent}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {i18n.dashboard.complete}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className="border border-gray-100 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {module.title}
                        </h4>
                        {module.isLocked && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            🔒 {i18n.dashboard.locked}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        {module.lessons.map((lesson) => {
                          const isCompleted = userProgress?.some(
                            (p) => p.lessonId === lesson.id && p.isCompleted,
                          );
                          const isCurrent =
                            lastAccessed?.lessonId === lesson.id;

                          return (
                            <Link
                              key={lesson.id}
                              href={`/learn/${course.slug}/${lesson.slug}`}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                                isCurrent
                                  ? "bg-blue-50 border-2 border-blue-200"
                                  : "hover:bg-gray-50 border-2 border-transparent"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? "bg-green-500 text-white"
                                    : isCurrent
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {isCompleted ? (
                                  <span className="text-xs">✓</span>
                                ) : isCurrent ? (
                                  <span className="text-xs">▶</span>
                                ) : (
                                  <span className="text-xs">
                                    {lesson.order}
                                  </span>
                                )}
                              </div>
                              <span className="text-gray-700 flex-1">
                                {lesson.title}
                              </span>
                              {lesson.isFree && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {i18n.dashboard.free}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
