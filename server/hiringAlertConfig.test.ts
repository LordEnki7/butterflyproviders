import assert from "node:assert/strict";
import test from "node:test";
import { getHiringAlertRecipient } from "./hiringAlertConfig";

test("requires a hiring alert recipient in production", () => {
  assert.throws(
    () => getHiringAlertRecipient({ NODE_ENV: "production" }),
    /HIRING_ALERT_RECIPIENT environment variable is required in production/,
  );
});

test("rejects an invalid hiring alert recipient", () => {
  assert.throws(
    () =>
      getHiringAlertRecipient({
        NODE_ENV: "development",
        HIRING_ALERT_RECIPIENT: "not-an-email",
      }),
    /HIRING_ALERT_RECIPIENT environment variable must be a valid email address/,
  );
});

test("accepts an explicit safe development recipient", () => {
  assert.equal(
    getHiringAlertRecipient({
      NODE_ENV: "development",
      HIRING_ALERT_RECIPIENT: " hiring-test@example.com ",
    }),
    "hiring-test@example.com",
  );
});

test("allows development to start without sending staff alerts", () => {
  assert.equal(
    getHiringAlertRecipient({ NODE_ENV: "development" }),
    undefined,
  );
});