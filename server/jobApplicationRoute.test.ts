import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import express from "express";
import multer from "multer";
import { registerJobApplicationRoute } from "./jobApplicationRoute";

const servers: Array<ReturnType<express.Express["listen"]>> = [];
const uploadDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        ),
    ),
  );
  await Promise.all(
    uploadDirectories
      .splice(0)
      .map((directory) => fs.rm(directory, { recursive: true, force: true })),
  );
});

const applicationData = {
  firstName: "Jamie",
  lastName: "Rivera",
  email: "jamie@example.com",
  phone: "602-555-0100",
  address: "Phoenix, AZ",
  skills: ["companionship"],
  consentBackground: true,
};

async function createRoute(options?: {
  insertError?: Error;
  applicantEmailError?: Error;
  staffEmailError?: Error;
  resumeCleanupError?: NodeJS.ErrnoException;
  staffEmail?: string;
  applicationData?: Record<string, unknown>;
  resume?: boolean;
}) {
  const calls = {
    inserts: [] as unknown[],
    applicantEmails: [] as unknown[][],
    staffEmails: [] as unknown[][],
    errors: [] as Array<{ message: string; context?: { code?: string } }>,
  };
  const app = express();
  const uploadDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "job-application-route-"),
  );
  uploadDirectories.push(uploadDirectory);

  registerJobApplicationRoute(app, {
    upload: multer({ dest: uploadDirectory }).single("resume"),
    insertApplication: async (values) => {
      calls.inserts.push(values);
      if (options?.insertError) throw options.insertError;
      return {
        id: "application-1",
        name: values.name,
        email: values.email,
        phone: values.phone,
        status: "pending",
        createdAt: new Date("2026-09-05T12:00:00Z"),
      };
    },
    emailEnabled: () => true,
    loadEmailTemplates: async () => ({
      jobApplicationConfirmation: async (...args) => {
        calls.applicantEmails.push(args);
        if (options?.applicantEmailError) throw options.applicantEmailError;
        return true;
      },
      jobApplicationNotification: async (...args) => {
        calls.staffEmails.push(args);
        if (options?.staffEmailError) throw options.staffEmailError;
        return true;
      },
    }),
    staffEmail:
      options && Object.hasOwn(options, "staffEmail")
        ? options.staffEmail
        : "staff@example.com",
    unlinkFile: options?.resumeCleanupError
      ? (_filePath, callback) => callback(options.resumeCleanupError!)
      : undefined,
    logError: (message, context) => calls.errors.push({ message, context }),
  });

  const server = app.listen(0);
  servers.push(server);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address === "object");

  const form = new FormData();
  form.set(
    "applicationData",
    JSON.stringify(options?.applicationData ?? applicationData),
  );
  if (options?.resume) {
    form.set(
      "resume",
      new Blob(["Jamie Rivera representative resume"], {
        type: "application/pdf",
      }),
      "jamie-rivera-resume.pdf",
    );
  }
  const response = await fetch(
    `http://127.0.0.1:${address.port}/api/job-applications`,
    { method: "POST", body: form },
  );

  return { response, calls, uploadDirectory };
}

async function uploadedFiles(uploadDirectory: string) {
  return fs.readdir(uploadDirectory);
}

async function waitForUploadedFiles(
  uploadDirectory: string,
  expectedCount: number,
) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const files = await uploadedFiles(uploadDirectory);
    if (files.length === expectedCount) return files;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  const files = await uploadedFiles(uploadDirectory);
  assert.equal(files.length, expectedCount);
  return files;
}

test("returns success and attempts both notifications when applicant email fails", async () => {
  const { response, calls } = await createRoute({
    applicantEmailError: new Error("applicant email unavailable"),
  });

  assert.equal(response.status, 201);
  assert.equal(calls.inserts.length, 1);
  assert.equal(calls.applicantEmails.length, 1);
  assert.equal(calls.staffEmails.length, 1);
});

test("returns success and attempts both notifications when staff email fails", async () => {
  const { response, calls } = await createRoute({
    staffEmailError: new Error("staff email unavailable"),
  });

  assert.equal(response.status, 201);
  assert.equal(calls.inserts.length, 1);
  assert.equal(calls.applicantEmails.length, 1);
  assert.equal(calls.staffEmails.length, 1);
});

test("does not attempt email when database persistence fails", async () => {
  const { response, calls } = await createRoute({
    insertError: new Error("database unavailable"),
  });

  assert.equal(response.status, 500);
  assert.equal(calls.inserts.length, 1);
  assert.equal(calls.applicantEmails.length, 0);
  assert.equal(calls.staffEmails.length, 0);
});

test("removes an uploaded resume when application validation fails", async () => {
  const { response, calls, uploadDirectory } = await createRoute({
    applicationData: { ...applicationData, phone: "" },
    resume: true,
  });

  assert.equal(response.status, 400);
  assert.equal(calls.inserts.length, 0);
  assert.deepEqual(await waitForUploadedFiles(uploadDirectory, 0), []);
});

test("removes an uploaded resume when database persistence fails", async () => {
  const { response, calls, uploadDirectory } = await createRoute({
    insertError: new Error("database unavailable"),
    resume: true,
  });

  assert.equal(response.status, 500);
  assert.equal(calls.inserts.length, 1);
  assert.deepEqual(await waitForUploadedFiles(uploadDirectory, 0), []);
});

test("logs validation cleanup failure safely without changing the response", async () => {
  const cleanupError = Object.assign(
    new Error(
      "permission denied for Jamie Rivera representative resume contents",
    ),
    { code: "EACCES" },
  );
  const { response, calls } = await createRoute({
    applicationData: { ...applicationData, phone: "" },
    resume: true,
    resumeCleanupError: cleanupError,
  });

  assert.equal(response.status, 400);
  assert.deepEqual(calls.errors, [
    {
      message: "Failed to delete uploaded resume after validation failure",
      context: { code: "EACCES" },
    },
  ]);
  const loggedOutput = JSON.stringify(calls.errors);
  assert.equal(loggedOutput.includes("Jamie"), false);
  assert.equal(loggedOutput.includes("representative resume contents"), false);
});

test("logs persistence cleanup failure safely without changing the response", async () => {
  const cleanupError = Object.assign(
    new Error("private resume data could not be removed"),
    { code: "EPERM" },
  );
  const { response, calls } = await createRoute({
    insertError: new Error("database unavailable"),
    resume: true,
    resumeCleanupError: cleanupError,
  });

  assert.equal(response.status, 500);
  assert.deepEqual(calls.errors, [
    {
      message: "Failed to delete uploaded resume after application failure",
      context: { code: "EPERM" },
    },
  ]);
  assert.equal(
    JSON.stringify(calls.errors).includes("private resume data"),
    false,
  );
});

test("retains an uploaded resume after a successful submission", async () => {
  const { response, calls, uploadDirectory } = await createRoute({
    resume: true,
  });

  assert.equal(response.status, 201);
  assert.equal(calls.inserts.length, 1);
  const files = await waitForUploadedFiles(uploadDirectory, 1);
  assert.equal(files.length, 1);

  const insertedApplication = calls.inserts[0] as {
    additionalNotes: string;
  };
  const notes = JSON.parse(insertedApplication.additionalNotes);
  assert.equal(notes.resume.originalName, "jamie-rivera-resume.pdf");
  assert.equal(notes.resume.mimeType, "application/pdf");
  assert.equal(notes.resume.storedName, files[0]);
});

test("skips the staff alert when no development recipient is configured", async () => {
  const { response, calls } = await createRoute({ staffEmail: undefined });

  assert.equal(response.status, 201);
  assert.equal(calls.applicantEmails.length, 1);
  assert.equal(calls.staffEmails.length, 0);
});

test("staff notification contains no resume attachment or public resume URL", async () => {
  const { response, calls } = await createRoute();

  assert.equal(response.status, 201);
  assert.equal(calls.staffEmails.length, 1);
  const [staffEmail, notification] = calls.staffEmails[0] as [
    string,
    Record<string, unknown>,
  ];
  assert.equal(staffEmail, "staff@example.com");
  assert.deepEqual(Object.keys(notification).sort(), [
    "email",
    "hasResume",
    "name",
    "phone",
    "submittedAt",
  ]);
  assert.equal(JSON.stringify(notification).includes("http"), false);
  assert.equal(JSON.stringify(notification).includes("attachment"), false);
  assert.equal(JSON.stringify(notification).includes("resumeUrl"), false);
});