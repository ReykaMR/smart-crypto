import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NavbarWrapper from "@/components/NavbarWrapper";
import CertificatesClient from "./CertificatesClient";

export default async function CertificatesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const certificates = await prisma.certificate.findMany({
    where: { userId },
    include: {
      course: true,
    },
    orderBy: { issuedAt: "desc" },
  });

  // Get user progress to check completed lessons
  const userProgress = await prisma.userProgress.findMany({
    where: { userId, isCompleted: true },
  });
  const completedLessonIds = userProgress.map((p) => p.lessonId);

  // Get courses that are completed but don't have certificates yet
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
      certificates: {
        where: { userId },
      },
    },
  });

  const completedCourses = courses.filter((course) => {
    const allLessonIds = course.modules.flatMap((m) =>
      m.lessons.map((l) => l.id),
    );
    const allCompleted = allLessonIds.every((id) =>
      completedLessonIds.includes(id),
    );
    return allCompleted && course.certificates.length === 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎓 Sertifikat Saya
            </h1>
            <p className="text-gray-600">Unduh sertifikat kelulusan Anda</p>
          </div>

          <CertificatesClient
            certificates={certificates}
            courses={courses}
            completedCourses={completedCourses}
            userId={userId}
          />
        </div>
      </main>
    </div>
  );
}
