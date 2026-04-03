"use server";

import { prisma } from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { revalidatePath } from "next/cache";

export async function generateCertificate({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!user || !course) {
      return { success: false, error: "User or course not found" };
    }

    // Check if all lessons are completed
    const modules = await prisma.courseModule.findMany({
      where: { courseId },
      include: {
        lessons: true,
      },
    });

    const allLessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));

    // Get all completed lessons for this user
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      select: {
        lessonId: true,
      },
    });

    const completedLessonIds = userProgress.map((p) => p.lessonId);

    // Verify ALL lessons are completed using .every()
    const allLessonsCompleted = allLessonIds.every((lessonId) =>
      completedLessonIds.includes(lessonId),
    );

    if (!allLessonsCompleted) {
      return { success: false, error: "Please complete all lessons first" };
    }

    // Create or get certificate
    let certificate = await prisma.certificate.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (!certificate) {
      const certId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      certificate = await prisma.certificate.create({
        data: {
          userId,
          courseId,
          certificateId: certId,
        },
      });
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape
    const { width, height } = page.getSize();

    // Embed font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBoldFont = await pdfDoc.embedFont(
      StandardFonts.TimesRomanBoldItalic,
    );

    // Background gradient effect (border)
    page.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderColor: rgb(0.2, 0.4, 0.8),
      borderWidth: 3,
    });

    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: rgb(0.8, 0.6, 0.2),
      borderWidth: 1,
    });

    // Title
    page.drawText("CERTIFICATE OF COMPLETION", {
      x: width / 2 - 200,
      y: height - 120,
      size: 36,
      font: timesBoldFont,
      color: rgb(0.2, 0.4, 0.8),
    });

    // Subtitle
    page.drawText("This is to certify that", {
      x: width / 2 - 120,
      y: height - 180,
      size: 18,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // User name
    page.drawText(user.name || user.email, {
      x: width / 2 - 150,
      y: height - 230,
      size: 32,
      font: timesBoldFont,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Course info
    page.drawText("has successfully completed the course", {
      x: width / 2 - 160,
      y: height - 290,
      size: 16,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Course title
    page.drawText(course.title, {
      x: width / 2 - 180,
      y: height - 330,
      size: 24,
      font: timesBoldFont,
      color: rgb(0.2, 0.4, 0.8),
    });

    // Date
    const issueDate = new Date(certificate.issuedAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    page.drawText(`Issued on: ${issueDate}`, {
      x: width / 2 - 100,
      y: height - 400,
      size: 14,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Certificate ID
    page.drawText(`Certificate ID: ${certificate.certificateId}`, {
      x: width / 2 - 120,
      y: height - 430,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Signature line
    page.drawLine({
      start: { x: width / 2 - 150, y: height - 480 },
      end: { x: width / 2 - 50, y: height - 480 },
      thickness: 1,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText("Smart Crypto Team", {
      x: width / 2 - 130,
      y: height - 500,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Serialize PDF
    const pdfBytes = await pdfDoc.save();
    const base64Pdf = Buffer.from(pdfBytes).toString("base64");

    revalidatePath("/dashboard");

    return {
      success: true,
      certificate: {
        id: certificate.id,
        certificateId: certificate.certificateId,
        issuedAt: certificate.issuedAt,
        pdf: base64Pdf,
      },
    };
  } catch (error) {
    console.error("Error generating certificate:", error);
    return { success: false, error: "Failed to generate certificate" };
  }
}
