import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertContactInquirySchema,
  insertClientSchema,
  insertCaregiverSchema,
  insertAppointmentSchema,
  insertCareUpdateSchema,
  insertServiceSchema,
  insertBillingSchema
} from "@shared/schema";
import { z } from "zod";

// Admin authentication middleware
const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user?.claims?.sub;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await storage.getUser(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    req.adminUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication error" });
  }
};

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

  // ===== ADMIN ROUTES =====

  // Admin dashboard with analytics
  app.get('/api/admin/dashboard', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // User Management Routes
  app.get('/api/admin/users', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put('/api/admin/users/:id/role', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await storage.updateUserRole(id, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Contact Inquiries Management
  app.get('/api/admin/contact-inquiries', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ message: "Failed to fetch contact inquiries" });
    }
  });

  // Client Management Routes
  app.get('/api/admin/clients', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.post('/api/admin/clients', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid client data", errors: error.errors });
      } else {
        console.error("Error creating client:", error);
        res.status(500).json({ message: "Failed to create client" });
      }
    }
  });

  app.get('/api/admin/clients/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  app.put('/api/admin/clients/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(req.params.id, validatedData);
      res.json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid client data", errors: error.errors });
      } else {
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Failed to update client" });
      }
    }
  });

  app.delete('/api/admin/clients/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Caregiver Management Routes
  app.get('/api/admin/caregivers', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const caregivers = await storage.getAllCaregivers();
      res.json(caregivers);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
      res.status(500).json({ message: "Failed to fetch caregivers" });
    }
  });

  app.post('/api/admin/caregivers', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertCaregiverSchema.parse(req.body);
      const caregiver = await storage.createCaregiver(validatedData);
      res.status(201).json(caregiver);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid caregiver data", errors: error.errors });
      } else {
        console.error("Error creating caregiver:", error);
        res.status(500).json({ message: "Failed to create caregiver" });
      }
    }
  });

  app.put('/api/admin/caregivers/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertCaregiverSchema.partial().parse(req.body);
      const caregiver = await storage.updateCaregiver(req.params.id, validatedData);
      res.json(caregiver);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid caregiver data", errors: error.errors });
      } else {
        console.error("Error updating caregiver:", error);
        res.status(500).json({ message: "Failed to update caregiver" });
      }
    }
  });

  app.delete('/api/admin/caregivers/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteCaregiver(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting caregiver:", error);
      res.status(500).json({ message: "Failed to delete caregiver" });
    }
  });

  // Appointment Management Routes
  app.get('/api/admin/appointments', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.post('/api/admin/appointments', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      } else {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Failed to create appointment" });
      }
    }
  });

  app.put('/api/admin/appointments/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertAppointmentSchema.partial().parse(req.body);
      const appointment = await storage.updateAppointment(req.params.id, validatedData);
      res.json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      } else {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Failed to update appointment" });
      }
    }
  });

  app.delete('/api/admin/appointments/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteAppointment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ message: "Failed to delete appointment" });
    }
  });

  // Care Updates Management Routes
  app.post('/api/admin/care-updates', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertCareUpdateSchema.parse(req.body);
      const careUpdate = await storage.createCareUpdate(validatedData);
      res.status(201).json(careUpdate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid care update data", errors: error.errors });
      } else {
        console.error("Error creating care update:", error);
        res.status(500).json({ message: "Failed to create care update" });
      }
    }
  });

  app.get('/api/admin/care-updates/client/:clientId', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const updates = await storage.getCareUpdatesByClient(req.params.clientId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching care updates:", error);
      res.status(500).json({ message: "Failed to fetch care updates" });
    }
  });

  // Service Management Routes
  app.get('/api/admin/services', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post('/api/admin/services', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid service data", errors: error.errors });
      } else {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Failed to create service" });
      }
    }
  });

  app.put('/api/admin/services/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(req.params.id, validatedData);
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid service data", errors: error.errors });
      } else {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Failed to update service" });
      }
    }
  });

  app.delete('/api/admin/services/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Billing Management Routes
  app.get('/api/admin/billings', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const billings = await storage.getAllBillings();
      res.json(billings);
    } catch (error) {
      console.error("Error fetching billings:", error);
      res.status(500).json({ message: "Failed to fetch billings" });
    }
  });

  app.post('/api/admin/billings', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertBillingSchema.parse(req.body);
      const billing = await storage.createBilling(validatedData);
      res.status(201).json(billing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid billing data", errors: error.errors });
      } else {
        console.error("Error creating billing:", error);
        res.status(500).json({ message: "Failed to create billing" });
      }
    }
  });

  app.put('/api/admin/billings/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertBillingSchema.partial().parse(req.body);
      const billing = await storage.updateBilling(req.params.id, validatedData);
      res.json(billing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid billing data", errors: error.errors });
      } else {
        console.error("Error updating billing:", error);
        res.status(500).json({ message: "Failed to update billing" });
      }
    }
  });

  app.get('/api/admin/billings/client/:clientId', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const billings = await storage.getBillingsByClient(req.params.clientId);
      res.json(billings);
    } catch (error) {
      console.error("Error fetching client billings:", error);
      res.status(500).json({ message: "Failed to fetch client billings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
