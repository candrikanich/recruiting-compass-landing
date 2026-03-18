import { createError } from "h3";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().trim().email();

interface WaitlistConfig {
  resendApiKey: string;
  resendAudienceId: string;
}

export async function addToWaitlist(rawEmail: unknown, config: WaitlistConfig) {
  const parsed = emailSchema.safeParse(rawEmail);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  }

  if (!config.resendApiKey || !config.resendAudienceId) {
    throw createError({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  }

  const resend = new Resend(config.resendApiKey);
  const { error } = await resend.contacts.create({
    audienceId: config.resendAudienceId,
    email: parsed.data,
  });

  if (error && (error.name as string) !== "already_exists") {
    throw createError({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  }

  return { success: true };
}
