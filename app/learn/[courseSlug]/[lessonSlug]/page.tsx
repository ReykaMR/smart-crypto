import { auth } from "@/lib/auth.config";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NavbarWrapper from "@/components/NavbarWrapper";
import Link from "next/link";
import LessonClient from "./LessonClient";

interface LessonPageProps {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              quiz: {
                include: {
                  questions: {
                    include: {
                      options: true,
                    },
                    orderBy: { order: "asc" },
                  },
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const lesson = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.slug === lessonSlug);

  if (!lesson) {
    notFound();
  }

  // Check if lesson is locked
  const userProgress = await prisma.userProgress.findMany({
    where: {
      userId: session.user.id,
      courseId: course.id,
      isCompleted: true,
    },
    include: {
      lesson: true,
    },
  });

  const completedLessonIds = userProgress.map((p) => p.lessonId);

  // Check if previous lessons are completed
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const previousLessons = allLessons.slice(0, currentLessonIndex);

  const isLocked = previousLessons.some(
    (l) => !completedLessonIds.includes(l.id) && !l.isFree,
  );

  // Get current lesson progress
  const currentProgress = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.user.id!,
        lessonId: lesson.id,
      },
    },
  });

  // Get next and previous lessons
  const prevLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  // Fetch all glossary terms for interactive popups
  const glossaryTerms = await prisma.glossaryTerm.findMany({
    select: {
      term: true,
      definition: true,
      example: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <div className="pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            {/* Sidebar - Course Navigation */}
            <aside className="hidden lg:block w-80 border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16 bg-white overflow-y-auto">
              <div className="p-6">
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 mb-4 block"
                >
                  ← Back to Dashboard
                </Link>
                <h2 className="font-bold text-gray-900 mb-4">{course.title}</h2>

                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id}>
                      <h3 className="font-semibold text-gray-700 text-sm mb-2">
                        {module.title}
                      </h3>
                      <div className="space-y-1">
                        {module.lessons.map((l) => {
                          const isCompleted = userProgress.some(
                            (p) => p.lessonId === l.id && p.isCompleted,
                          );
                          const isCurrent = l.id === lesson.id;
                          const isPrevCompleted =
                            l.id === prevLesson?.id ||
                            userProgress.some(
                              (p) => p.lessonId === l.id && p.isCompleted,
                            );

                          return (
                            <Link
                              key={l.id}
                              href={`/learn/${courseSlug}/${l.slug}`}
                              className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
                                isCurrent
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "hover:bg-gray-50 text-gray-700"
                              } ${!isPrevCompleted && !l.isFree && !isCurrent ? "opacity-50 pointer-events-none" : ""}`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                  isCompleted
                                    ? "bg-green-500 text-white"
                                    : isCurrent
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {isCompleted ? "✓" : l.order}
                              </div>
                              <span className="flex-1 truncate">{l.title}</span>
                              {l.quiz && <span className="text-xs">📝</span>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <LessonClient
                lesson={lesson}
                course={course}
                isLocked={isLocked}
                currentProgress={currentProgress}
                prevLesson={prevLesson}
                nextLesson={nextLesson}
                courseSlug={courseSlug}
                userId={session.user.id!}
                glossaryTerms={glossaryTerms}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
