import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json({ message: "Contact inquiry submitted successfully", id: inquiry.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error creating contact inquiry:", error);
        res.status(500).json({ message: "Failed to submit contact inquiry" });
      }
    }
  });

  // Protected client portal data endpoint
  app.get('/api/client/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      // Return client portal data
      res.json({
        user,
        careUpdates: [
          {
            id: '1',
            date: new Date().toISOString(),
            type: 'Care Visit',
            caregiver: 'Professional Caregiver',
            notes: 'Your care visit has been completed successfully.',
            status: 'completed'
          }
        ],
        upcomingAppointments: [
          {
            id: '1',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            type: 'Care Visit',
            caregiver: 'Professional Caregiver'
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching client dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
