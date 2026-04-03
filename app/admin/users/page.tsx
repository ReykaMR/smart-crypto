import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          progress: true,
          certificates: true,
          quizAttempts: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = (await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "USER" } }),
  ])) as [number, number, number];

  return <AdminUsersClient users={users} stats={stats} />;
}
