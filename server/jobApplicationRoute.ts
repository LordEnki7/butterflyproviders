import type { Express, RequestHandler } from "express";
import fs from "fs";
import path from "path";

type SavedApplication = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string | null;
  createdAt: Date | null;
};

type ApplicationValues = {
  name: string;
  email: string;
  phone: string;
  workExperience: string;
  backgroundCheckConsent: boolean;
  fingerprintConsent: boolean;
  additionalNotes: string;
  status: string;
};

type JobApplicationEmailTemplates = {
  jobApplicationConfirmation(to: string, applicantName: string): Promise<boolean>;
  jobApplicationNotification(
    staffEmail: string,
    applicationData: {
      name: string;
      email: string;
      phone: string;
      submittedAt: string;
      hasResume: boolean;
    },
  ): Promise<boolean>;
};

export type JobApplicationRouteDependencies = {
  upload: RequestHandler;
  insertApplication(values: ApplicationValues): Promise<SavedApplication>;
  emailEnabled(): boolean;
  loadEmailTemplates(): Promise<JobApplicationEmailTemplates>;
  staffEmail?: string;
  unlinkFile?: (
    filePath: string,
    callback: (error: NodeJS.ErrnoException | null) => void,
  ) => void;
  logError?: (message: string, context?: { code?: string }) => void;
};

export function registerJobApplicationRoute(
  app: Express,
  dependencies: JobApplicationRouteDependencies,
) {
  const removeUploadedResume = (
    filePath: string,
    stage: "validation failure" | "application failure",
  ) => {
    const unlinkFile = dependencies.unlinkFile ?? fs.unlink;
    unlinkFile(filePath, (error) => {
      if (!error) return;

      const logError = dependencies.logError ?? console.error;
      logError(`Failed to delete uploaded resume after ${stage}`, {
        code: error.code,
      });
    });
  };

  app.post("/api/job-applications", dependencies.upload, async (req, res) => {
    try {
      const data = JSON.parse(req.body.applicationData || "{}");
      if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.phone ||
        !data.address ||
        !data.skills ||
        data.consentBackground !== true
      ) {
        if (req.file) {
          removeUploadedResume(req.file.path, "validation failure");
        }
        return res.status(400).json({
          message: "Please complete all required application fields and consents.",
        });
      }

      const application = await dependencies.insertApplication({
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone,
        workExperience: JSON.stringify({
          hasExperience: data.hasExperience,
          companyName: data.companyName,
          position: data.position,
          startDate: data.startDate,
          endDate: data.endDate,
          jobDescription: data.jobDescription,
          reasonForLeaving: data.reasonForLeaving,
        }),
        backgroundCheckConsent: true,
        fingerprintConsent: true,
        additionalNotes: JSON.stringify({
          gender: data.gender,
          address: data.address,
          otherLanguages: data.otherLanguages,
          skills: data.skills,
          availability: {
            mornings: !!data.availabilityMornings,
            afternoons: !!data.availabilityAfternoons,
            evenings: !!data.availabilityEvenings,
            weekends: !!data.availabilityWeekends,
          },
          preferences: {
            overnight: data.willingOvernight,
            alzheimers: data.willingAlzheimers,
            behavioral: data.willingBehavioral,
            pets: data.willingPets,
            smoking: data.willingSmoking,
          },
          resume: req.file
            ? {
                storedName: req.file.filename,
                originalName: path.basename(req.file.originalname),
                mimeType: req.file.mimetype,
                size: req.file.size,
              }
            : null,
        }),
        status: "pending",
      });

      if (dependencies.emailEnabled()) {
        try {
          const emailTemplates = await dependencies.loadEmailTemplates();
          const emailJobs: Array<{
            recipient: "applicant" | "staff";
            send: Promise<boolean>;
          }> = [
            {
              recipient: "applicant",
              send: emailTemplates.jobApplicationConfirmation(
                application.email,
                application.name,
              ),
            },
          ];

          if (dependencies.staffEmail) {
            emailJobs.push({
              recipient: "staff",
              send: emailTemplates.jobApplicationNotification(
                dependencies.staffEmail,
                {
                  name: application.name,
                  email: application.email,
                  phone: application.phone,
                  submittedAt: (
                    application.createdAt || new Date()
                  ).toLocaleString(),
                  hasResume: Boolean(req.file),
                },
              ),
            });
          }

          const emailResults = await Promise.allSettled(
            emailJobs.map(({ send }) => send),
          );

          emailResults.forEach((result, index) => {
            const recipient = emailJobs[index].recipient;
            if (result.status === "rejected" || result.value === false) {
              console.error(`Failed to send job application email to ${recipient}`);
            }
          });
        } catch (emailError) {
          console.error(
            "Failed to send job application emails:",
            emailError instanceof Error
              ? emailError.message
              : "Email service error",
          );
        }
      }

      res.status(201).json({
        message: "Job application submitted successfully",
        application: {
          id: application.id,
          name: application.name,
          email: application.email,
          phone: application.phone,
          status: application.status,
        },
      });
    } catch (error) {
      console.error("Error creating job application:", error);
      if (req.file) {
        removeUploadedResume(req.file.path, "application failure");
      }
      res.status(500).json({ message: "Failed to submit job application" });
    }
  });
}