"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const slug = formData.get("slug") as string;

    if (!title || !description || !slug) {
      return { success: false, error: "All fields are required" };
    }

    await prisma.course.create({
      data: {
        title,
        slug,
        description,
        isPublished: formData.get("isPublished") === "on",
      },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Failed to create course" };
  }
}

export async function updateCourse(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const slug = formData.get("slug") as string;

    await prisma.course.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        isPublished: formData.get("isPublished") === "on",
      },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({
      where: { id },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, error: "Failed to delete course" };
  }
}

export async function createModule(formData: FormData) {
  try {
    const courseId = formData.get("courseId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const order = parseInt(formData.get("order") as string);

    await prisma.courseModule.create({
      data: {
        courseId,
        title,
        description,
        order,
        isLocked: formData.get("isLocked") === "on",
      },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error creating module:", error);
    return { success: false, error: "Failed to create module" };
  }
}

export async function createLesson(formData: FormData) {
  try {
    const moduleId = formData.get("moduleId") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const order = parseInt(formData.get("order") as string);
    const duration = formData.get("duration")
      ? parseInt(formData.get("duration") as string)
      : null;

    await prisma.lesson.create({
      data: {
        moduleId,
        title,
        slug,
        content,
        order,
        duration,
        isFree: formData.get("isFree") === "on",
      },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: "Failed to create lesson" };
  }
}

export async function deleteLesson(id: string) {
  try {
    await prisma.lesson.delete({
      where: { id },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return { success: false, error: "Failed to delete lesson" };
  }
}
