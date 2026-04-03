import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NavbarWrapper from "@/components/NavbarWrapper";
import DashboardClient from "./DashboardClient";
import { getServerTranslations } from "@/lib/i18n-server";

export default async function DashboardPage() {
  const session = await auth();
  const t = await getServerTranslations();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: {
        include: {
          lesson: {
            include: {
              module: {
                include: {
                  course: true,
                },
              },
            },
          },
        },
      },
      certificates: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      modules: {
        include: {
          lessons: true,
        },
        orderBy: { order: "asc" },
      },
      progress: {
        where: { userId: user.id },
      },
    },
    orderBy: { order: "asc" },
  });

  // Calculate overall progress
  const totalLessons = courses.reduce(
    (acc, course) =>
      acc + course.modules.reduce((a, m) => a + m.lessons.length, 0),
    0,
  );
  const completedLessons = user.progress.filter((p) => p.isCompleted).length;
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Get last accessed lesson
  const lastAccessedLesson = user.progress
    .filter((p) => p.lessonId && p.isCompleted)
    .sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime(),
    )[0];

  const lastAccessed =
    lastAccessedLesson &&
    lastAccessedLesson.lesson &&
    lastAccessedLesson.lessonId
      ? {
          lessonId: lastAccessedLesson.lessonId,
          lesson: {
            title: lastAccessedLesson.lesson.title,
            slug: lastAccessedLesson.lesson.slug,
            moduleId: lastAccessedLesson.lesson.moduleId,
          },
        }
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <DashboardClient
            user={user}
            userProgress={user.progress}
            courses={courses}
            overallProgress={overallProgress}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            lastAccessed={lastAccessed}
            translations={t}
          />
        </div>
      </main>
    </div>
  );
}
