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
  insertInvoiceSchema,
  insertInvoiceItemSchema,
  insertBillingSchema
} from "@shared/schema";
import { z } from "zod";

// Admin password - in production, this should be an environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "butterfly2025";

// Admin authentication middleware for password-based access
const isAdminAuth = async (req: any, res: any, next: any) => {
  try {
    // Check if admin session exists
    if (req.session?.adminAuthenticated) {
      return next();
    }
    
    return res.status(401).json({ message: "Admin authentication required" });
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

  // ===== ADMIN AUTHENTICATION ROUTES =====

  // Admin login with password
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        req.session.adminAuthenticated = true;
        res.json({ success: true, message: "Admin authenticated successfully" });
      } else {
        res.status(401).json({ message: "Invalid admin password" });
      }
    } catch (error) {
      console.error("Error in admin login:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Check admin authentication status
  app.get('/api/admin/check-auth', (req, res) => {
    if (req.session?.adminAuthenticated) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // Admin logout
  app.post('/api/admin/logout', (req, res) => {
    req.session.adminAuthenticated = false;
    res.json({ success: true, message: "Admin logged out successfully" });
  });

  // ===== ADMIN ROUTES =====

  // Admin dashboard with analytics
  app.get('/api/admin/dashboard', isAdminAuth, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // User Management Routes
  app.get('/api/admin/users', isAdminAuth, async (req: any, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put('/api/admin/users/:id/role', isAdminAuth, async (req: any, res) => {
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
  app.get('/api/admin/contact-inquiries', isAdminAuth, async (req: any, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ message: "Failed to fetch contact inquiries" });
    }
  });

  // Client Management Routes
  app.get('/api/admin/clients', isAdminAuth, async (req: any, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.post('/api/admin/clients', isAdminAuth, async (req: any, res) => {
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

  app.get('/api/admin/clients/:id', isAdminAuth, async (req: any, res) => {
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

  app.put('/api/admin/clients/:id', isAdminAuth, async (req: any, res) => {
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

  app.delete('/api/admin/clients/:id', isAdminAuth, async (req: any, res) => {
    try {
      await storage.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Caregiver Management Routes
  app.get('/api/admin/caregivers', isAdminAuth, async (req: any, res) => {
    try {
      const caregivers = await storage.getAllCaregivers();
      res.json(caregivers);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
      res.status(500).json({ message: "Failed to fetch caregivers" });
    }
  });

  app.post('/api/admin/caregivers', isAdminAuth, async (req: any, res) => {
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

  app.put('/api/admin/caregivers/:id', isAdminAuth, async (req: any, res) => {
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

  app.delete('/api/admin/caregivers/:id', isAdminAuth, async (req: any, res) => {
    try {
      await storage.deleteCaregiver(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting caregiver:", error);
      res.status(500).json({ message: "Failed to delete caregiver" });
    }
  });

  // Appointment Management Routes
  app.get('/api/admin/appointments', isAdminAuth, async (req: any, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.post('/api/admin/appointments', isAdminAuth, async (req: any, res) => {
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

  app.put('/api/admin/appointments/:id', isAdminAuth, async (req: any, res) => {
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

  app.delete('/api/admin/appointments/:id', isAdminAuth, async (req: any, res) => {
    try {
      await storage.deleteAppointment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ message: "Failed to delete appointment" });
    }
  });

  // Care Updates Management Routes
  app.post('/api/admin/care-updates', isAdminAuth, async (req: any, res) => {
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

  app.get('/api/admin/care-updates/client/:clientId', isAdminAuth, async (req: any, res) => {
    try {
      const updates = await storage.getCareUpdatesByClient(req.params.clientId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching care updates:", error);
      res.status(500).json({ message: "Failed to fetch care updates" });
    }
  });

  // Service Management Routes
  app.get('/api/admin/services', isAdminAuth, async (req: any, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post('/api/admin/services', isAdminAuth, async (req: any, res) => {
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

  app.put('/api/admin/services/:id', isAdminAuth, async (req: any, res) => {
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

  app.delete('/api/admin/services/:id', isAdminAuth, async (req: any, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Billing Management Routes
  app.get('/api/admin/billings', isAdminAuth, async (req: any, res) => {
    try {
      const billings = await storage.getAllBillings();
      res.json(billings);
    } catch (error) {
      console.error("Error fetching billings:", error);
      res.status(500).json({ message: "Failed to fetch billings" });
    }
  });

  app.post('/api/admin/billings', isAdminAuth, async (req: any, res) => {
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

  app.put('/api/admin/billings/:id', isAdminAuth, async (req: any, res) => {
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

  app.get('/api/admin/billings/client/:clientId', isAdminAuth, async (req: any, res) => {
    try {
      const billings = await storage.getBillingsByClient(req.params.clientId);
      res.json(billings);
    } catch (error) {
      console.error("Error fetching client billings:", error);
      res.status(500).json({ message: "Failed to fetch client billings" });
    }
  });

  // ===== INVOICE MANAGEMENT ROUTES =====

  // Get all invoices
  app.get('/api/admin/invoices', isAdminAuth, async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  // Get single invoice with items
  app.get('/api/admin/invoices/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      const items = await storage.getInvoiceItems(id);
      res.json({ ...invoice, items });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });

  // Create new invoice
  app.post('/api/admin/invoices', isAdminAuth, async (req, res) => {
    try {
      const { items, ...invoiceData } = req.body;
      
      // Generate invoice number
      const invoiceNumber = await storage.generateInvoiceNumber();
      
      // Create invoice
      const invoice = await storage.createInvoice({
        ...invoiceData,
        invoiceNumber,
      });

      // Create invoice items
      if (items && items.length > 0) {
        for (const item of items) {
          await storage.createInvoiceItem({
            ...item,
            invoiceId: invoice.id,
          });
        }
      }

      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  // Update invoice
  app.put('/api/admin/invoices/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { items, ...invoiceData } = req.body;
      
      // Update invoice
      const invoice = await storage.updateInvoice(id, invoiceData);
      
      // If items are provided, update them
      if (items) {
        // Delete existing items
        const existingItems = await storage.getInvoiceItems(id);
        for (const item of existingItems) {
          await storage.deleteInvoiceItem(item.id);
        }
        
        // Create new items
        for (const item of items) {
          await storage.createInvoiceItem({
            ...item,
            invoiceId: id,
          });
        }
      }

      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });

  // Delete invoice
  app.delete('/api/admin/invoices/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteInvoice(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Failed to delete invoice" });
    }
  });

  // Get invoices by client
  app.get('/api/admin/clients/:clientId/invoices', isAdminAuth, async (req, res) => {
    try {
      const { clientId } = req.params;
      const invoices = await storage.getInvoicesByClient(clientId);
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching client invoices:", error);
      res.status(500).json({ message: "Failed to fetch client invoices" });
    }
  });

  // Mark invoice as paid
  app.post('/api/admin/invoices/:id/mark-paid', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentMethod, paidAt } = req.body;
      
      const invoice = await storage.updateInvoice(id, {
        status: 'paid',
        paymentMethod,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      });
      
      res.json(invoice);
    } catch (error) {
      console.error("Error marking invoice as paid:", error);
      res.status(500).json({ message: "Failed to mark invoice as paid" });
    }
  });

  // Generate invoice from appointments
  app.post('/api/admin/invoices/generate', isAdminAuth, async (req, res) => {
    try {
      const { clientId, appointmentIds, dueDate, notes } = req.body;
      
      let subtotal = 0;
      const items = [];
      
      // Process each appointment
      for (const appointmentId of appointmentIds) {
        const appointment = await storage.getAppointment(appointmentId);
        if (!appointment) continue;
        
        const service = await storage.getService(appointment.serviceType);
        const rate = service?.basePrice || 50; // Default rate
        const hours = appointment.duration / 60;
        const amount = Number(rate) * hours;
        
        items.push({
          appointmentId,
          serviceDescription: `${service?.name || appointment.serviceType} - ${appointment.duration} minutes`,
          quantity: hours,
          rate,
          amount,
          serviceDate: appointment.scheduledDate,
        });
        
        subtotal += amount;
      }
      
      // Generate invoice number
      const invoiceNumber = await storage.generateInvoiceNumber();
      
      // Create invoice
      const invoice = await storage.createInvoice({
        invoiceNumber,
        clientId,
        subtotal,
        tax: 0,
        total: subtotal,
        dueDate: new Date(dueDate),
        notes,
      });
      
      // Create invoice items
      for (const item of items) {
        await storage.createInvoiceItem({
          ...item,
          invoiceId: invoice.id,
        });
      }
      
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error generating invoice:", error);
      res.status(500).json({ message: "Failed to generate invoice" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
