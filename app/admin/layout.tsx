import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminLayoutClient from "./AdminLayoutClient";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  // Check if user is logged in
  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // Check if user is admin
  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Get stats for sidebar
  const stats = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.glossaryTerm.count(),
    prisma.userProgress.count({ where: { isCompleted: true } }),
  ]);

  return (
    <AdminLayoutClient user={session.user} stats={stats}>
      {children}
    </AdminLayoutClient>
  );
}
