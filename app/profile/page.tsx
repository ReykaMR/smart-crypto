import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NavbarWrapper from "@/components/NavbarWrapper";
import ProfileClient from "./ProfileClient";
import { getUserBadges } from "@/app/actions/badges";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: {
        where: { isCompleted: true },
      },
      certificates: true,
      quizAttempts: {
        where: { passed: true },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const badgesData = await getUserBadges(user.id);

  const stats = {
    lessonsCompleted: user.progress.length,
    certificatesEarned: user.certificates.length,
    quizzesPassed: user.quizAttempts.length,
    quizzesTotal: user.quizAttempts.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ProfileClient
            user={user}
            stats={stats}
            badges={
              badgesData.success
                ? {
                    earned: badgesData.earned || [],
                    available: badgesData.available || [],
                  }
                : { earned: [], available: [] }
            }
            userId={user.id}
          />
        </div>
      </main>
    </div>
  );
}
