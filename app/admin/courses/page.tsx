import { prisma } from "@/lib/prisma";
import AdminCourseClient from "./AdminCourseClient";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
        orderBy: { order: "asc" },
      },
      _count: {
        select: {
          progress: true,
          certificates: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminCourseClient courses={courses} />;
}
