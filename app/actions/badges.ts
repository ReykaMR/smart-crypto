"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function checkAndAwardBadges(userId: string) {
  try {
    const userProgress = await prisma.userProgress.count({
      where: { userId, isCompleted: true },
    });

    const quizAttempts = await prisma.quizAttempt.count({
      where: { userId, passed: true },
    });

    const certificates = await prisma.certificate.count({
      where: { userId },
    });

    const badges = await prisma.badge.findMany();
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      select: { badgeId: true },
    });
    const earnedBadgeIds = userBadges.map((b) => b.badgeId);

    const badgesToAward: string[] = [];

    for (const badge of badges) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      let shouldAward = false;

      switch (badge.category) {
        case "learning":
          if (userProgress >= badge.requirement) shouldAward = true;
          break;
        case "quiz":
          if (quizAttempts >= badge.requirement) shouldAward = true;
          break;
        case "certificate":
          if (certificates >= badge.requirement) shouldAward = true;
          break;
      }

      if (shouldAward) {
        badgesToAward.push(badge.id);
      }
    }

    // Award badges
    for (const badgeId of badgesToAward) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId,
        },
      });
    }

    if (badgesToAward.length > 0) {
      revalidatePath("/dashboard");
      revalidatePath("/profile");
    }

    return { success: true, awarded: badgesToAward.length };
  } catch (error) {
    console.error("Error awarding badges:", error);
    return { success: false, error: "Failed to award badges" };
  }
}

export async function getUserBadges(userId: string) {
  try {
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true,
      },
      orderBy: { earnedAt: "desc" },
    });

    const allBadges = await prisma.badge.findMany();

    return {
      success: true,
      earned: userBadges,
      available: allBadges.filter(
        (b) => !userBadges.some((ub) => ub.badgeId === b.id),
      ),
    };
  } catch (error) {
    console.error("Error getting badges:", error);
    return { success: false, error: "Failed to get badges" };
  }
}
