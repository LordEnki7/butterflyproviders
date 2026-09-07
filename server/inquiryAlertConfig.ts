import { z } from "zod";

const alertRecipientSchema = z.string().trim().email();

function getAlertRecipient(
  variableName: "CONTACT_ALERT_RECIPIENT" | "CONSULTATION_ALERT_RECIPIENT",
  environment: NodeJS.ProcessEnv,
): string | undefined {
  const rawRecipient = environment[variableName];

  if (!rawRecipient) {
    if (environment.NODE_ENV === "production") {
      throw new Error(
        `${variableName} environment variable is required in production`,
      );
    }
    return undefined;
  }

  const parsedRecipient = alertRecipientSchema.safeParse(rawRecipient);
  if (!parsedRecipient.success) {
    throw new Error(
      `${variableName} environment variable must be a valid email address`,
    );
  }

  return parsedRecipient.data;
}

export function getContactAlertRecipient(
  environment: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return getAlertRecipient("CONTACT_ALERT_RECIPIENT", environment);
}

export function getConsultationAlertRecipient(
  environment: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return getAlertRecipient("CONSULTATION_ALERT_RECIPIENT", environment);
}