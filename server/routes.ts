import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated, isAdminAuth, login, register } from "./auth";
import { db } from "./db";
import { consultations, jobApplications } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { 
  insertContactInquirySchema,
  clientSignupSchema,
  loginSchema,
  registerSchema,
  insertClientSchema,
  insertCaregiverSchema,
  insertCaregiverAvailabilitySchema,
  insertCaregiverTimeOffSchema,
  insertAppointmentSchema,
  insertAppointmentRecurringSchema,
  insertCareUpdateSchema,
  insertServiceSchema,
  insertInvoiceSchema,
  insertInvoiceItemSchema,
  insertBillingSchema
} from "@shared/schema";
import { z } from "zod";

// Setup session middleware
function setupSession(app: Express) {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  // Use memory store for simplicity in development
  app.use(session({
    secret: process.env.SESSION_SECRET || 'butterfly-secret-key-development',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
      httpOnly: false, // Allow JavaScript access for debugging
      secure: false,
      maxAge: sessionTtl,
      sameSite: 'lax',
      path: '/'
    },
  }));
}

// Admin password - in production, this should be an environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "butterfly2025";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  setupSession(app);

  // ===== AUTHENTICATION ROUTES =====
  
  // Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await login(validatedData.email, validatedData.password);
      
      // Set user session and save it explicitly
      (req.session as any).userId = user.id;
      (req.session as any).userRole = user.role;
      
      console.log('Login successful - Session saved:', {
        userId: user.id,
        sessionId: req.sessionID,
        userRole: user.role
      });
      
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ message: error instanceof Error ? error.message : "Login failed" });
    }
  });

  // Register endpoint
  app.post('/api/register', async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await register(validatedData);
      
      // Set user session
      (req.session as any).userId = user.id;
      (req.session as any).userRole = user.role;
      
      // Send welcome email with Brevo
      if (process.env.BREVO_API_KEY) {
        try {
          const { EmailTemplates } = await import('./brevoService');
          await EmailTemplates.welcome(user.email, user.firstName);
          console.log('✅ Welcome email sent to:', user.email);
        } catch (emailError) {
          console.error('❌ Failed to send welcome email:', emailError);
          // Don't fail registration if email fails
        }
      }
      
      console.log('Registration successful - Session set:', {
        userId: user.id,
        sessionId: req.sessionID,
        userRole: user.role
      });
      
      res.status(201).json({
        success: true,
        message: "Registration successful! Welcome to Butterfly Providers.",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Registration error:", error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Registration failed" });
      }
    }
  });

  // Logout endpoint
  app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true, message: "Logout successful" });
    });
  });

  // Get current user
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      const userId = (req.session as any)?.userId;
      console.log('Getting user - Session check:', {
        sessionId: req.sessionID,
        userId,
        hasSession: !!req.session,
        sessionData: req.session
      });
      
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Client dashboard data endpoint
  app.get('/api/client/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.session as any).userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Mock personalized dashboard data - in a real app this would come from the database
      const dashboardData = {
        user,
        careUpdates: [
          {
            id: "1",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            type: "Personal Care Session",
            caregiver: "Sarah Johnson, CNA",
            notes: "Completed morning routine including assistance with bathing and medication reminder. Client was in good spirits and reported feeling well.",
            status: "completed"
          },
          {
            id: "2", 
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            type: "Meal Preparation",
            caregiver: "Maria Garcia, HHA",
            notes: "Prepared healthy breakfast and lunch. Discussed nutrition goals with client. Grocery shopping completed for the week.",
            status: "completed"
          },
          {
            id: "3",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
            type: "Companionship Visit",
            caregiver: "Robert Chen, Companion",
            notes: "Enjoyed conversation about client's gardening interests. Took a short walk around the neighborhood. Client expressed enjoyment of social interaction.",
            status: "completed"
          }
        ],
        upcomingAppointments: [
          {
            id: "1",
            date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
            type: "Personal Care & Light Housekeeping",
            caregiver: "Sarah Johnson, CNA"
          },
          {
            id: "2",
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
            type: "Transportation to Medical Appointment",
            caregiver: "Michael Davis, Aide"
          },
          {
            id: "3",
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
            type: "Meal Prep & Grocery Shopping",
            caregiver: "Maria Garcia, HHA"
          }
        ],
        stats: {
          totalAppointments: 24,
          completedThisMonth: 8,
          nextAppointment: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          primaryCaregiver: "Sarah Johnson, CNA"
        }
      };
      
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      // Send notification email to admin using Brevo
      if (process.env.BREVO_API_KEY) {
        try {
          const { EmailTemplates } = await import('./brevoService');
          await EmailTemplates.contactNotification(
            'admin@butterflyproviders.com', // Admin email - change this to your admin email
            {
              name: validatedData.name,
              email: validatedData.email,
              phone: validatedData.phone || '',
              message: validatedData.message,
              submittedAt: new Date().toLocaleString()
            }
          );
          console.log('✅ Contact notification sent to admin');
        } catch (emailError) {
          console.error('❌ Failed to send contact notification:', emailError);
          // Don't fail form submission if email fails
        }
      }
      
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

  // Consultation scheduling route
  app.post("/api/consultation", async (req, res) => {
    try {
      const { name, email, phone, preferredDate, preferredTime, message, agreeToContact } = req.body;

      if (!agreeToContact) {
        return res.status(400).json({ message: "Agreement to contact is required" });
      }

      // Store consultation request in database
      const consultation = await storage.createConsultation({
        name,
        email,
        phone,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        message: message || null,
        agreeToContact,
        status: 'pending'
      });

      // Send consultation notification to admin using Brevo
      if (process.env.BREVO_API_KEY) {
        try {
          const { EmailTemplates } = await import('./brevoService');
          await EmailTemplates.contactNotification(
            'admin@butterflyproviders.com', // Admin email
            {
              name,
              email,
              phone: phone || '',
              message: `CONSULTATION REQUEST\n\nPreferred Date: ${preferredDate || 'Not specified'}\nPreferred Time: ${preferredTime || 'Not specified'}\n\nMessage: ${message || 'No additional message'}`,
              submittedAt: new Date().toLocaleString()
            }
          );
          console.log('✅ Consultation notification sent to admin');
        } catch (emailError) {
          console.error('❌ Failed to send consultation notification:', emailError);
          // Don't fail consultation if email fails
        }
      }

      res.json({ message: "Consultation scheduled successfully", consultation });
    } catch (error: any) {
      console.error("Error scheduling consultation:", error);
      res.status(500).json({ message: "Failed to schedule consultation" });
    }
  });

  // Client signup endpoint
  app.post('/api/signup', async (req, res) => {
    try {
      const validatedData = clientSignupSchema.parse(req.body);
      
      // Create user and client record
      const user = await storage.createUser({
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: 'client'
      });

      const client = await storage.createClient({
        userId: user.id,
        emergencyContact: validatedData.emergencyContact,
        emergencyPhone: validatedData.emergencyPhone,
        address: validatedData.address,
        status: 'pending' // Requires approval
      });

      res.status(201).json({ 
        message: "Application submitted successfully", 
        userId: user.id,
        clientId: client.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error creating client signup:", error);
        res.status(500).json({ message: "Failed to submit application" });
      }
    }
  });

  // Protected client portal data endpoint
  app.get('/api/client/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.session as any)?.userId;
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
        (req.session as any).adminAuthenticated = true;
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
    if ((req.session as any)?.adminAuthenticated) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // Admin logout
  app.post('/api/admin/logout', (req, res) => {
    (req.session as any).adminAuthenticated = false;
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

  // ===== SCHEDULING API ROUTES =====
  
  // Get available caregivers for a specific date/duration
  app.get('/api/scheduling/available-caregivers', async (req, res) => {
    try {
      const { date, duration } = req.query;
      if (!date || !duration) {
        return res.status(400).json({ message: "Date and duration are required" });
      }
      
      const appointmentDate = new Date(date as string);
      const durationMinutes = parseInt(duration as string);
      
      const availableCaregivers = await storage.getAvailableCaregivers(appointmentDate, durationMinutes);
      res.json(availableCaregivers);
    } catch (error) {
      console.error("Error fetching available caregivers:", error);
      res.status(500).json({ message: "Failed to fetch available caregivers" });
    }
  });

  // Get available time slots for a caregiver
  app.get('/api/scheduling/time-slots/:caregiverId', async (req, res) => {
    try {
      const { caregiverId } = req.params;
      const { date, duration } = req.query;
      
      if (!date || !duration) {
        return res.status(400).json({ message: "Date and duration are required" });
      }
      
      const appointmentDate = new Date(date as string);
      const durationMinutes = parseInt(duration as string);
      
      const timeSlots = await storage.getAvailableTimeSlots(caregiverId, appointmentDate, durationMinutes);
      res.json(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      res.status(500).json({ message: "Failed to fetch time slots" });
    }
  });

  // Check availability for instant booking
  app.post('/api/scheduling/check-availability', async (req, res) => {
    try {
      const { caregiverId, date, duration } = req.body;
      
      if (!caregiverId || !date || !duration) {
        return res.status(400).json({ message: "Caregiver ID, date, and duration are required" });
      }
      
      const appointmentDate = new Date(date);
      const isAvailable = await storage.checkAvailability(caregiverId, appointmentDate, duration);
      
      res.json({ available: isAvailable });
    } catch (error) {
      console.error("Error checking availability:", error);
      res.status(500).json({ message: "Failed to check availability" });
    }
  });

  // Instant booking endpoint
  app.post('/api/scheduling/book-appointment', isAuthenticated, async (req: any, res) => {
    try {
      const { caregiverId, serviceId, scheduledDate, duration, clientNotes } = req.body;
      const userId = (req.session as any)?.userId;
      
      // Find or create client record
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check availability before booking
      const appointmentDate = new Date(scheduledDate);
      const isAvailable = await storage.checkAvailability(caregiverId, appointmentDate, duration);
      
      if (!isAvailable) {
        return res.status(409).json({ message: "Time slot is no longer available" });
      }
      
      // Create the appointment
      const endDate = new Date(appointmentDate.getTime() + duration * 60000);
      const appointment = await storage.createAppointment({
        clientId: userId, // Using user ID as client ID for now
        caregiverId,
        serviceId,
        scheduledDate: appointmentDate,
        endDate,
        duration,
        serviceType: "Home Care", // Default service type
        status: "scheduled",
        priority: "normal",
        clientNotes,
        estimatedCost: 0, // Will be calculated based on service
      });
      
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ message: "Failed to book appointment" });
    }
  });

  // Cancel appointment endpoint
  app.post('/api/scheduling/cancel-appointment', isAuthenticated, async (req: any, res) => {
    try {
      const { appointmentId, reason, policyType = 'standard' } = req.body;
      const userId = (req.session as any)?.userId;

      if (!appointmentId || !reason) {
        return res.status(400).json({ message: "Appointment ID and cancellation reason are required" });
      }

      // Get the appointment to calculate fees
      const appointment = await storage.getAppointment(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      // Verify the user owns this appointment
      if (appointment.clientId !== userId) {
        return res.status(403).json({ message: "Unauthorized to cancel this appointment" });
      }

      // Calculate cancellation fee
      const cost = parseFloat(appointment.estimatedCost || "0");
      const appointmentDate = new Date(appointment.scheduledDate);
      const now = new Date();
      const hoursUntilAppt = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      let feePercent = 0;
      if (policyType === 'standard') {
        if (hoursUntilAppt < 4) feePercent = 50;
        else if (hoursUntilAppt < 24) feePercent = 25;
      } else if (policyType === 'premium') {
        if (hoursUntilAppt < 4) feePercent = 75;
        else if (hoursUntilAppt < 24) feePercent = 35;
        else if (hoursUntilAppt < 48) feePercent = 15;
      } else if (policyType === 'emergency') {
        if (hoursUntilAppt < 2) feePercent = 100;
      }

      const cancellationFee = (cost * feePercent) / 100;
      const refundAmount = cost - cancellationFee;

      // Cancel the appointment
      const cancelledAppointment = await storage.cancelAppointment(appointmentId, {
        cancelReason: reason,
        cancelledBy: 'client',
        cancellationFee,
        refundAmount
      });

      res.json({
        success: true,
        appointment: cancelledAppointment,
        cancellationFee,
        refundAmount,
        message: `Appointment cancelled. ${feePercent > 0 ? `Cancellation fee: $${cancellationFee.toFixed(2)}, Refund: $${refundAmount.toFixed(2)}` : 'No cancellation fee applies.'}`
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      res.status(500).json({ message: "Failed to cancel appointment" });
    }
  });

  // Enhanced booking with reminders
  app.post('/api/scheduling/book-appointment-with-reminders', isAuthenticated, async (req: any, res) => {
    try {
      const { caregiverId, serviceId, scheduledDate, duration, clientNotes, reminders } = req.body;
      const userId = (req.session as any)?.userId;
      
      // Find or create client record
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check availability before booking
      const appointmentDate = new Date(scheduledDate);
      const isAvailable = await storage.checkAvailability(caregiverId, appointmentDate, duration);
      
      if (!isAvailable) {
        return res.status(409).json({ message: "Time slot is no longer available" });
      }
      
      // Create the appointment with reminders
      const endDate = new Date(appointmentDate.getTime() + duration * 60000);
      const appointmentData = {
        clientId: userId,
        caregiverId,
        serviceId,
        scheduledDate: appointmentDate,
        endDate,
        duration,
        serviceType: "Home Care",
        status: "scheduled",
        priority: "normal",
        clientNotes,
        estimatedCost: 0,
      };

      const result = await storage.bookAppointmentWithReminders(appointmentData, reminders);
      
      res.status(201).json(result);
    } catch (error) {
      console.error("Error booking appointment with reminders:", error);
      res.status(500).json({ message: "Failed to book appointment" });
    }
  });

  // Book recurring appointment
  app.post('/api/scheduling/book-recurring-appointment', isAuthenticated, async (req: any, res) => {
    try {
      const { 
        caregiverId, 
        serviceId, 
        scheduledDate, 
        duration, 
        clientNotes,
        recurrencePattern,
        daysOfWeek,
        startTime,
        endDate,
        maxOccurrences,
        reminders
      } = req.body;
      const userId = (req.session as any)?.userId;
      
      // Find or create client record
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Create recurring appointment pattern
      const recurringAppointment = await storage.createRecurringAppointment({
        clientId: userId,
        caregiverId,
        serviceId,
        recurrencePattern,
        daysOfWeek: daysOfWeek ? JSON.stringify(daysOfWeek) : null,
        startDate: new Date(scheduledDate),
        endDate: endDate ? new Date(endDate) : null,
        maxOccurrences: maxOccurrences ? parseInt(maxOccurrences) : null,
        duration,
        startTime,
        clientNotes,
      });

      // Generate appointments for the next 30 days
      const generatedCount = await storage.generateRecurringAppointments(recurringAppointment.id, 30);

      res.status(201).json({
        recurringAppointment,
        generatedCount,
        message: `Created recurring appointment pattern. Generated ${generatedCount} upcoming appointments.`
      });
    } catch (error) {
      console.error("Error booking recurring appointment:", error);
      res.status(500).json({ message: "Failed to book recurring appointment" });
    }
  });

  // Caregiver availability management
  app.get('/api/admin/caregivers/:id/availability', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const availability = await storage.getCaregiverAvailability(id);
      res.json(availability);
    } catch (error) {
      console.error("Error fetching caregiver availability:", error);
      res.status(500).json({ message: "Failed to fetch caregiver availability" });
    }
  });

  app.post('/api/admin/caregivers/:id/availability', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertCaregiverAvailabilitySchema.parse({
        ...req.body,
        caregiverId: id
      });
      
      const availability = await storage.setCaregiverAvailability(validatedData);
      res.status(201).json(availability);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid availability data", errors: error.errors });
      } else {
        console.error("Error setting caregiver availability:", error);
        res.status(500).json({ message: "Failed to set caregiver availability" });
      }
    }
  });

  app.put('/api/admin/availability/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertCaregiverAvailabilitySchema.partial().parse(req.body);
      
      const availability = await storage.updateCaregiverAvailability(id, validatedData);
      res.json(availability);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid availability data", errors: error.errors });
      } else {
        console.error("Error updating caregiver availability:", error);
        res.status(500).json({ message: "Failed to update caregiver availability" });
      }
    }
  });

  app.delete('/api/admin/availability/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCaregiverAvailability(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting caregiver availability:", error);
      res.status(500).json({ message: "Failed to delete caregiver availability" });
    }
  });

  // Caregiver time-off management
  app.get('/api/admin/caregivers/:id/time-off', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const timeOff = await storage.getCaregiverTimeOff(id);
      res.json(timeOff);
    } catch (error) {
      console.error("Error fetching caregiver time-off:", error);
      res.status(500).json({ message: "Failed to fetch caregiver time-off" });
    }
  });

  app.post('/api/admin/caregivers/:id/time-off', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertCaregiverTimeOffSchema.parse({
        ...req.body,
        caregiverId: id
      });
      
      const timeOff = await storage.createCaregiverTimeOff(validatedData);
      res.status(201).json(timeOff);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid time-off data", errors: error.errors });
      } else {
        console.error("Error creating caregiver time-off:", error);
        res.status(500).json({ message: "Failed to create caregiver time-off" });
      }
    }
  });

  // Appointment status management
  app.post('/api/admin/appointments/:id/confirm', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await storage.confirmAppointment(id);
      res.json(appointment);
    } catch (error) {
      console.error("Error confirming appointment:", error);
      res.status(500).json({ message: "Failed to confirm appointment" });
    }
  });

  app.post('/api/admin/appointments/:id/cancel', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const appointment = await storage.cancelAppointment(id, reason);
      res.json(appointment);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      res.status(500).json({ message: "Failed to cancel appointment" });
    }
  });

  // Get appointments by date range for calendar view
  app.get('/api/admin/appointments/calendar', isAdminAuth, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }
      
      const appointments = await storage.getAppointmentsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching calendar appointments:", error);
      res.status(500).json({ message: "Failed to fetch calendar appointments" });
    }
  });

  // ===== BILLING CLIENT API ROUTES =====
  
  app.get('/api/billing/invoices', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.session as any).userId;
      const invoices = await storage.getInvoicesByUserId(userId);
      
      // Transform invoices to include formatted data for frontend
      const formattedInvoices = invoices.map(invoice => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: Number(invoice.total),
        status: invoice.status,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        description: invoice.notes,
        createdAt: invoice.createdAt,
      }));
      
      res.json(formattedInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.get('/api/billing/summary', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.session as any).userId;
      const summary = await storage.getBillingSummaryByUserId(userId);
      res.json(summary);
    } catch (error) {
      console.error("Error fetching billing summary:", error);
      res.status(500).json({ message: "Failed to fetch billing summary" });
    }
  });

  app.get('/api/billing/payments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.session as any).userId;
      const payments = await storage.getPaymentHistoryByUserId(userId);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Failed to fetch payment history" });
    }
  });

  app.get('/api/billing/invoices/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = (req.session as any).userId;
      
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      // Verify user owns this invoice by checking client relationship
      const userInvoices = await storage.getInvoicesByUserId(userId);
      const userOwnsInvoice = userInvoices.some(inv => inv.id === id);
      
      if (!userOwnsInvoice) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const items = await storage.getInvoiceItemsByInvoiceId(id);
      
      const formattedInvoice = {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: Number(invoice.total),
        status: invoice.status,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        description: invoice.notes,
        items: items.map(item => ({
          id: item.id,
          description: item.serviceDescription,
          quantity: Number(item.quantity),
          rate: Number(item.rate),
          amount: Number(item.amount),
        })),
      };
      
      res.json(formattedInvoice);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });

  app.get('/api/billing/invoices/:id/download', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = (req.session as any).userId;
      
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      // Verify user owns this invoice
      const userInvoices = await storage.getInvoicesByUserId(userId);
      const userOwnsInvoice = userInvoices.some(inv => inv.id === id);
      
      if (!userOwnsInvoice) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Generate simple PDF content (in production, use a proper PDF library)
      const pdfContent = `
BUTTERFLY PROVIDERS
Non-Medical Home Care Services
10720 West Indian School Rd.
Phoenix, AZ 85037
Phone: 602-830-0966

INVOICE

Invoice Number: ${invoice.invoiceNumber}
Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}
Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}

Amount Due: $${Number(invoice.total).toFixed(2)}
Status: ${invoice.status.toUpperCase()}

Description: ${invoice.notes || 'Care services provided'}

Thank you for choosing Butterfly Providers for your care needs.
      `;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceNumber}.pdf"`);
      res.send(Buffer.from(pdfContent, 'utf-8'));
    } catch (error) {
      console.error("Error downloading invoice:", error);
      res.status(500).json({ message: "Failed to download invoice" });
    }
  });

  // ===== CAREGIVER SCHEDULE MANAGEMENT API ROUTES =====

  // Get weekly caregiver schedules
  app.get('/api/admin/caregiver-schedules/:weekStart', isAdminAuth, async (req: any, res) => {
    try {
      const weekStart = new Date(req.params.weekStart);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const schedules = await storage.getCaregiverSchedulesByWeek(weekStart, weekEnd);
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching caregiver schedules:", error);
      res.status(500).json({ message: "Failed to fetch caregiver schedules" });
    }
  });

  // Get caregiver schedules for specific caregiver
  app.get('/api/admin/caregiver-schedules/caregiver/:caregiverId', isAdminAuth, async (req: any, res) => {
    try {
      const { caregiverId } = req.params;
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : new Date();
      const end = endDate ? new Date(endDate as string) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      const schedules = await storage.getCaregiverSchedulesByCaregiver(caregiverId, start, end);
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching caregiver schedules:", error);
      res.status(500).json({ message: "Failed to fetch caregiver schedules" });
    }
  });

  // Create caregiver schedule (appointment)
  app.post('/api/admin/caregiver-schedules', isAdminAuth, async (req: any, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const schedule = await storage.createCaregiverSchedule(validatedData);
      res.status(201).json(schedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid schedule data", errors: error.errors });
      } else {
        console.error("Error creating caregiver schedule:", error);
        res.status(500).json({ message: "Failed to create caregiver schedule" });
      }
    }
  });

  // Update caregiver schedule
  app.put('/api/admin/caregiver-schedules/:id', isAdminAuth, async (req: any, res) => {
    try {
      const validatedData = insertAppointmentSchema.partial().parse(req.body);
      const schedule = await storage.updateCaregiverSchedule(req.params.id, validatedData);
      res.json(schedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid schedule data", errors: error.errors });
      } else {
        console.error("Error updating caregiver schedule:", error);
        res.status(500).json({ message: "Failed to update caregiver schedule" });
      }
    }
  });

  // Delete caregiver schedule
  app.delete('/api/admin/caregiver-schedules/:id', isAdminAuth, async (req: any, res) => {
    try {
      await storage.deleteCaregiverSchedule(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting caregiver schedule:", error);
      res.status(500).json({ message: "Failed to delete caregiver schedule" });
    }
  });

  // ===== CONSULTATION BOOKING ENDPOINT =====
  
  // Public consultation booking endpoint
  app.post('/api/consultations', async (req, res) => {
    try {
      const { name, email, phone, preferredDate, preferredTime, message, agreeToContact } = req.body;
      
      if (!name || !email || !phone || !agreeToContact) {
        return res.status(400).json({ message: 'Name, email, phone, and consent are required' });
      }

      // Create consultation entry directly
      const [consultation] = await db
        .insert(consultations)
        .values({
          name,
          email,
          phone,
          preferredDate,
          preferredTime,
          message,
          agreeToContact,
          status: 'pending'
        })
        .returning();

      res.json({
        message: 'Consultation request submitted successfully',
        consultation: {
          id: consultation.id,
          name: consultation.name,
          email: consultation.email,
          phone: consultation.phone,
          status: consultation.status
        }
      });
    } catch (error) {
      console.error('Error creating consultation:', error);
      res.status(500).json({ message: 'Failed to submit consultation request' });
    }
  });

  // ===== JOB APPLICATION ENDPOINT =====
  
  // Public job application endpoint
  app.post('/api/job-applications', async (req, res) => {
    try {
      const { name, email, phone, workExperience, backgroundCheckConsent, fingerprintConsent, additionalNotes } = req.body;
      
      if (!name || !email || !phone || !workExperience || !backgroundCheckConsent || !fingerprintConsent) {
        return res.status(400).json({ message: 'Name, email, phone, work experience, and consents are required' });
      }

      // Create job application entry directly
      const [application] = await db
        .insert(jobApplications)
        .values({
          name,
          email,
          phone,
          workExperience,
          backgroundCheckConsent,
          fingerprintConsent,
          additionalNotes,
          status: 'pending'
        })
        .returning();

      res.json({
        message: 'Job application submitted successfully',
        application: {
          id: application.id,
          name: application.name,
          email: application.email,
          phone: application.phone,
          status: application.status
        }
      });
    } catch (error) {
      console.error('Error creating job application:', error);
      res.status(500).json({ message: 'Failed to submit job application' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
