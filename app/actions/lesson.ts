"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeLesson({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) {
  try {
    await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        isCompleted: true,
        quizPassed: true,
        lastAccessed: new Date(),
      },
      create: {
        userId,
        lessonId,
        isCompleted: true,
        quizPassed: true,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/learn/[courseSlug]/[lessonSlug]`);

    return { success: true };
  } catch (error) {
    console.error("Error completing lesson:", error);
    return { success: false, error: "Failed to complete lesson" };
  }
}

export async function submitQuiz({
  quizId,
  userId,
  answers,
}: {
  quizId: string;
  userId: string;
  answers: Record<string, string>;
}) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
        lesson: true,
      },
    });

    if (!quiz) {
      return { score: 0, passed: false, error: "Quiz not found" };
    }

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (o) => o.id === selectedOptionId,
        );
        if (selectedOption?.isCorrect) {
          earnedPoints += question.points;
        }
      }
    });

    const score =
      totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;

    // Save quiz attempt
    await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score: earnedPoints,
        passed,
        answers: JSON.stringify(answers),
      },
    });

    // Update lesson progress
    await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: quiz.lessonId,
        },
      },
      update: {
        isCompleted: passed,
        quizPassed: passed,
        lastAccessed: new Date(),
      },
      create: {
        userId,
        lessonId: quiz.lessonId,
        isCompleted: passed,
        quizPassed: passed,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/learn/[courseSlug]/[lessonSlug]`);

    return { score, passed };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return { score: 0, passed: false, error: "Failed to submit quiz" };
  }
}
