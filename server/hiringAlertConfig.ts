import { z } from "zod";

const hiringAlertRecipientSchema = z.string().trim().email();

export function getHiringAlertRecipient(
  environment: NodeJS.ProcessEnv = process.env,
): string | undefined {
  const rawRecipient = environment.HIRING_ALERT_RECIPIENT;

  if (!rawRecipient) {
    if (environment.NODE_ENV === "production") {
      throw new Error(
        "HIRING_ALERT_RECIPIENT environment variable is required in production",
      );
    }
    return undefined;
  }

  const parsedRecipient = hiringAlertRecipientSchema.safeParse(rawRecipient);
  if (!parsedRecipient.success) {
    throw new Error(
      "HIRING_ALERT_RECIPIENT environment variable must be a valid email address",
    );
  }

  return parsedRecipient.data;
}