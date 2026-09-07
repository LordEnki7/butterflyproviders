import assert from "node:assert/strict";
import test from "node:test";
import {
  getContactAlertRecipient,
  getConsultationAlertRecipient,
} from "./inquiryAlertConfig";

const recipientConfigurations = [
  {
    name: "contact",
    variableName: "CONTACT_ALERT_RECIPIENT",
    getRecipient: getContactAlertRecipient,
  },
  {
    name: "consultation",
    variableName: "CONSULTATION_ALERT_RECIPIENT",
    getRecipient: getConsultationAlertRecipient,
  },
] as const;

for (const configuration of recipientConfigurations) {
  test(`requires a ${configuration.name} alert recipient in production`, () => {
    assert.throws(
      () => configuration.getRecipient({ NODE_ENV: "production" }),
      new RegExp(
        `${configuration.variableName} environment variable is required in production`,
      ),
    );
  });

  test(`rejects an invalid ${configuration.name} alert recipient`, () => {
    assert.throws(
      () =>
        configuration.getRecipient({
          NODE_ENV: "development",
          [configuration.variableName]: "not-an-email",
        }),
      new RegExp(
        `${configuration.variableName} environment variable must be a valid email address`,
      ),
    );
  });

  test(`accepts an explicit safe ${configuration.name} development recipient`, () => {
    assert.equal(
      configuration.getRecipient({
        NODE_ENV: "development",
        [configuration.variableName]: ` ${configuration.name}-test@example.com `,
      }),
      `${configuration.name}-test@example.com`,
    );
  });

  test(`allows development to start without ${configuration.name} alerts`, () => {
    assert.equal(
      configuration.getRecipient({ NODE_ENV: "development" }),
      undefined,
    );
  });
}