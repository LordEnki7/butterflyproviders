import {
  users,
  contactInquiries,
  clients,
  caregivers,
  appointments,
  careUpdates,
  services,
  invoices,
  invoiceItems,
  billings,
  analytics,
  type User,
  type UpsertUser,
  type InsertContactInquiry,
  type ContactInquiry,
  type Client,
  type InsertClient,
  type Caregiver,
  type InsertCaregiver,
  type Appointment,
  type InsertAppointment,
  type CareUpdate,
  type InsertCareUpdate,
  type Service,
  type InsertService,
  type Invoice,
  type InsertInvoice,
  type InvoiceItem,
  type InsertInvoiceItem,
  type Billing,
  type InsertBilling,
  type Analytics,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, count, sum, gte, lte } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User>;
  
  // Contact operations
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
  
  // Client operations
  createClient(client: InsertClient): Promise<Client>;
  getAllClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client>;
  deleteClient(id: string): Promise<void>;
  
  // Caregiver operations
  createCaregiver(caregiver: InsertCaregiver): Promise<Caregiver>;
  getAllCaregivers(): Promise<Caregiver[]>;
  getCaregiver(id: string): Promise<Caregiver | undefined>;
  updateCaregiver(id: string, caregiver: Partial<InsertCaregiver>): Promise<Caregiver>;
  deleteCaregiver(id: string): Promise<void>;
  
  // Appointment operations
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByClient(clientId: string): Promise<Appointment[]>;
  getAppointmentsByCaregiver(caregiverId: string): Promise<Appointment[]>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment>;
  deleteAppointment(id: string): Promise<void>;
  
  // Care update operations
  createCareUpdate(update: InsertCareUpdate): Promise<CareUpdate>;
  getCareUpdatesByClient(clientId: string): Promise<CareUpdate[]>;
  getCareUpdatesByCaregiver(caregiverId: string): Promise<CareUpdate[]>;
  markCareUpdateAsRead(id: string): Promise<CareUpdate>;
  
  // Service operations
  createService(service: InsertService): Promise<Service>;
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;
  
  // Invoice operations
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  getInvoicesByClient(clientId: string): Promise<Invoice[]>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice>;
  deleteInvoice(id: string): Promise<void>;
  generateInvoiceNumber(): Promise<string>;
  
  // Invoice item operations
  createInvoiceItem(item: InsertInvoiceItem): Promise<InvoiceItem>;
  getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]>;
  updateInvoiceItem(id: string, item: Partial<InsertInvoiceItem>): Promise<InvoiceItem>;
  deleteInvoiceItem(id: string): Promise<void>;
  
  // Billing operations
  createBilling(billing: InsertBilling): Promise<Billing>;
  getAllBillings(): Promise<Billing[]>;
  getBilling(id: string): Promise<Billing | undefined>;
  getBillingsByClient(clientId: string): Promise<Billing[]>;
  updateBilling(id: string, billing: Partial<InsertBilling>): Promise<Billing>;
  
  // Analytics operations
  getDashboardStats(): Promise<{
    totalClients: number;
    activeAppointments: number;
    totalRevenue: number;
    pendingBills: number;
    recentCareUpdates: CareUpdate[];
    upcomingAppointments: Appointment[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Contact operations
  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [createdInquiry] = await db.insert(contactInquiries).values(inquiry).returning();
    return createdInquiry;
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  // Client operations
  async createClient(client: InsertClient): Promise<Client> {
    const [createdClient] = await db.insert(clients).values(client).returning();
    return createdClient;
  }

  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async updateClient(id: string, clientData: Partial<InsertClient>): Promise<Client> {
    const [client] = await db
      .update(clients)
      .set({ ...clientData, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return client;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // Caregiver operations
  async createCaregiver(caregiver: InsertCaregiver): Promise<Caregiver> {
    const [createdCaregiver] = await db.insert(caregivers).values(caregiver).returning();
    return createdCaregiver;
  }

  async getAllCaregivers(): Promise<Caregiver[]> {
    return await db.select().from(caregivers).orderBy(desc(caregivers.createdAt));
  }

  async getCaregiver(id: string): Promise<Caregiver | undefined> {
    const [caregiver] = await db.select().from(caregivers).where(eq(caregivers.id, id));
    return caregiver;
  }

  async updateCaregiver(id: string, caregiverData: Partial<InsertCaregiver>): Promise<Caregiver> {
    const [caregiver] = await db
      .update(caregivers)
      .set({ ...caregiverData, updatedAt: new Date() })
      .where(eq(caregivers.id, id))
      .returning();
    return caregiver;
  }

  async deleteCaregiver(id: string): Promise<void> {
    await db.delete(caregivers).where(eq(caregivers.id, id));
  }

  // Appointment operations
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [createdAppointment] = await db.insert(appointments).values(appointment).returning();
    return createdAppointment;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments).orderBy(desc(appointments.scheduledDate));
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async getAppointmentsByClient(clientId: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.clientId, clientId)).orderBy(desc(appointments.scheduledDate));
  }

  async getAppointmentsByCaregiver(caregiverId: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.caregiverId, caregiverId)).orderBy(desc(appointments.scheduledDate));
  }

  async updateAppointment(id: string, appointmentData: Partial<InsertAppointment>): Promise<Appointment> {
    const [appointment] = await db
      .update(appointments)
      .set({ ...appointmentData, updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    return appointment;
  }

  async deleteAppointment(id: string): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }

  // Care update operations
  async createCareUpdate(update: InsertCareUpdate): Promise<CareUpdate> {
    const [createdUpdate] = await db.insert(careUpdates).values(update).returning();
    return createdUpdate;
  }

  async getCareUpdatesByClient(clientId: string): Promise<CareUpdate[]> {
    return await db.select().from(careUpdates).where(eq(careUpdates.clientId, clientId)).orderBy(desc(careUpdates.createdAt));
  }

  async getCareUpdatesByCaregiver(caregiverId: string): Promise<CareUpdate[]> {
    return await db.select().from(careUpdates).where(eq(careUpdates.caregiverId, caregiverId)).orderBy(desc(careUpdates.createdAt));
  }

  async markCareUpdateAsRead(id: string): Promise<CareUpdate> {
    const [update] = await db
      .update(careUpdates)
      .set({ isReadByFamily: true })
      .where(eq(careUpdates.id, id))
      .returning();
    return update;
  }

  // Service operations
  async createService(service: InsertService): Promise<Service> {
    const [createdService] = await db.insert(services).values(service).returning();
    return createdService;
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async updateService(id: string, serviceData: Partial<InsertService>): Promise<Service> {
    const [service] = await db
      .update(services)
      .set({ ...serviceData, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service;
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Billing operations
  async createBilling(billing: InsertBilling): Promise<Billing> {
    const [createdBilling] = await db.insert(billings).values(billing).returning();
    return createdBilling;
  }

  async getAllBillings(): Promise<Billing[]> {
    return await db.select().from(billings).orderBy(desc(billings.createdAt));
  }

  async getBilling(id: string): Promise<Billing | undefined> {
    const [billing] = await db.select().from(billings).where(eq(billings.id, id));
    return billing;
  }

  async getBillingsByClient(clientId: string): Promise<Billing[]> {
    return await db.select().from(billings).where(eq(billings.clientId, clientId)).orderBy(desc(billings.createdAt));
  }

  async updateBilling(id: string, billingData: Partial<InsertBilling>): Promise<Billing> {
    const [billing] = await db
      .update(billings)
      .set({ ...billingData })
      .where(eq(billings.id, id))
      .returning();
    return billing;
  }

  // Invoice operations
  async createInvoice(invoiceData: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db.insert(invoices).values(invoiceData).returning();
    return invoice;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice;
  }

  async getInvoicesByClient(clientId: string): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.clientId, clientId)).orderBy(desc(invoices.createdAt));
  }

  async updateInvoice(id: string, invoiceData: Partial<InsertInvoice>): Promise<Invoice> {
    const [invoice] = await db
      .update(invoices)
      .set({ ...invoiceData, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();
    return invoice;
  }

  async deleteInvoice(id: string): Promise<void> {
    // First delete all invoice items
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    // Then delete the invoice
    await db.delete(invoices).where(eq(invoices.id, id));
  }

  async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    
    // Get the count of invoices this month
    const [{ count: invoiceCount }] = await db
      .select({ count: count() })
      .from(invoices)
      .where(
        and(
          gte(invoices.createdAt, new Date(year, month - 1, 1)),
          lte(invoices.createdAt, new Date(year, month, 0))
        )
      );

    const monthStr = month.toString().padStart(2, '0');
    const sequenceStr = (invoiceCount + 1).toString().padStart(4, '0');
    
    return `BP-${year}${monthStr}-${sequenceStr}`;
  }

  // Invoice item operations
  async createInvoiceItem(itemData: InsertInvoiceItem): Promise<InvoiceItem> {
    const [item] = await db.insert(invoiceItems).values(itemData).returning();
    return item;
  }

  async getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]> {
    return await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
  }

  async updateInvoiceItem(id: string, itemData: Partial<InsertInvoiceItem>): Promise<InvoiceItem> {
    const [item] = await db
      .update(invoiceItems)
      .set(itemData)
      .where(eq(invoiceItems.id, id))
      .returning();
    return item;
  }

  async deleteInvoiceItem(id: string): Promise<void> {
    await db.delete(invoiceItems).where(eq(invoiceItems.id, id));
  }

  // Analytics operations
  async getDashboardStats(): Promise<{
    totalClients: number;
    activeAppointments: number;
    totalRevenue: number;
    pendingBills: number;
    recentCareUpdates: CareUpdate[];
    upcomingAppointments: Appointment[];
  }> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get total clients count
    const [{ totalClients }] = await db
      .select({ totalClients: count() })
      .from(clients)
      .where(eq(clients.status, "active"));

    // Get active appointments count (today and future)
    const [{ activeAppointments }] = await db
      .select({ activeAppointments: count() })
      .from(appointments)
      .where(
        and(
          gte(appointments.scheduledDate, today),
          eq(appointments.status, "scheduled")
        )
      );

    // Get total revenue from paid bills this month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [{ totalRevenue }] = await db
      .select({ totalRevenue: sum(billings.amount) })
      .from(billings)
      .where(
        and(
          eq(billings.status, "paid"),
          gte(billings.paidAt, firstDayOfMonth)
        )
      );

    // Get pending bills count
    const [{ pendingBills }] = await db
      .select({ pendingBills: count() })
      .from(billings)
      .where(eq(billings.status, "pending"));

    // Get recent care updates (last 5)
    const recentCareUpdates = await db
      .select()
      .from(careUpdates)
      .orderBy(desc(careUpdates.createdAt))
      .limit(5);

    // Get upcoming appointments (next 5)
    const upcomingAppointments = await db
      .select()
      .from(appointments)
      .where(
        and(
          gte(appointments.scheduledDate, today),
          eq(appointments.status, "scheduled")
        )
      )
      .orderBy(appointments.scheduledDate)
      .limit(5);

    return {
      totalClients: totalClients || 0,
      activeAppointments: activeAppointments || 0,
      totalRevenue: Number(totalRevenue || 0),
      pendingBills: pendingBills || 0,
      recentCareUpdates,
      upcomingAppointments,
    };
  }
}

export const storage = new DatabaseStorage();
