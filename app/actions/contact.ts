"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(formData: FormData) {
  const validated = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.format()._errors?.[0] || "Validation failed",
    };
  }

  const { name, email, subject, message } = validated.data;

  // In production, send email or save to database
  console.log("Contact Form Submission:", {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  // TODO: Integrate with email service (e.g., Resend, SendGrid)
  // TODO: Save to database for tracking

  return { success: true };
}
