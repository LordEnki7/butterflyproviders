import {
  users,
  contactInquiries,
  consultationRequests,
  consultations,
  clients,
  caregivers,
  caregiverAvailability,
  caregiverTimeOff,
  appointments,
  appointmentReminders,
  recurringAppointments,
  generatedAppointments,
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
  type ConsultationRequest,
  type InsertConsultationRequest,
  type Consultation,
  type InsertConsultation,
  type Client,
  type InsertClient,
  type Caregiver,
  type InsertCaregiver,
  type CaregiverAvailability,
  type InsertCaregiverAvailability,
  type CaregiverTimeOff,
  type InsertCaregiverTimeOff,
  type Appointment,
  type InsertAppointment,
  type AppointmentReminder,
  type InsertAppointmentReminder,
  type RecurringAppointment,
  type InsertRecurringAppointment,
  type GeneratedAppointment,
  type InsertGeneratedAppointment,
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

export type AppointmentCancellation = {
  cancelReason: string;
  cancelledBy: string;
  cancellationFee?: number;
  refundAmount?: number;
};

export function buildAppointmentCancellationUpdate(
  cancellation: string | AppointmentCancellation,
  cancelledAt = new Date(),
) {
  if (typeof cancellation === "string") {
    return {
      status: "cancelled",
      cancelReason: cancellation,
      cancelledAt,
      updatedAt: cancelledAt,
    };
  }

  return {
    status: "cancelled",
    cancelReason: cancellation.cancelReason,
    cancelledBy: cancellation.cancelledBy,
    cancellationFee: cancellation.cancellationFee?.toString(),
    refundAmount: cancellation.refundAmount?.toString(),
    cancelledAt,
    updatedAt: cancelledAt,
  };
}

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: Partial<UpsertUser>): Promise<User>;
  updateUser(id: string, userData: Partial<UpsertUser>): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User>;
  
  // Contact operations
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
  
  // Consultation request operations
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getAllConsultationRequests(): Promise<ConsultationRequest[]>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getAllConsultations(): Promise<Consultation[]>;
  
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
  getAvailableCaregivers(date: Date, duration: number): Promise<Caregiver[]>;
  
  // Caregiver availability operations
  setCaregiverAvailability(availability: InsertCaregiverAvailability): Promise<CaregiverAvailability>;
  getCaregiverAvailability(caregiverId: string): Promise<CaregiverAvailability[]>;
  updateCaregiverAvailability(id: string, availability: Partial<InsertCaregiverAvailability>): Promise<CaregiverAvailability>;
  deleteCaregiverAvailability(id: string): Promise<void>;
  
  // Caregiver time-off operations
  createCaregiverTimeOff(timeOff: InsertCaregiverTimeOff): Promise<CaregiverTimeOff>;
  getCaregiverTimeOff(caregiverId: string): Promise<CaregiverTimeOff[]>;
  updateCaregiverTimeOff(id: string, timeOff: Partial<InsertCaregiverTimeOff>): Promise<CaregiverTimeOff>;
  deleteCaregiverTimeOff(id: string): Promise<void>;
  
  // Appointment operations
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  cancelAppointment(appointmentId: string, cancellationData: AppointmentCancellation): Promise<Appointment>;
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByClient(clientId: string): Promise<Appointment[]>;
  getAppointmentsByCaregiver(caregiverId: string): Promise<Appointment[]>;
  getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment>;
  deleteAppointment(id: string): Promise<void>;
  confirmAppointment(id: string): Promise<Appointment>;
  cancelAppointment(id: string, reason?: string): Promise<Appointment>;
  
  // Scheduling operations
  checkAvailability(caregiverId: string, date: Date, duration: number): Promise<boolean>;
  getAvailableTimeSlots(caregiverId: string, date: Date, duration: number): Promise<{startTime: string, endTime: string}[]>;
  
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
  getInvoicesByUserId(userId: string): Promise<Invoice[]>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice>;
  deleteInvoice(id: string): Promise<void>;
  generateInvoiceNumber(): Promise<string>;
  getBillingSummaryByUserId(userId: string): Promise<any>;
  getPaymentHistoryByUserId(userId: string): Promise<any[]>;
  createInvoiceItem(item: InsertInvoiceItem): Promise<InvoiceItem>;
  getInvoiceItemsByInvoiceId(invoiceId: string): Promise<InvoiceItem[]>;
  
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
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData as UpsertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
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

  // Consultation request operations (new scheduling form)
  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const [createdRequest] = await db.insert(consultationRequests).values(request).returning();
    return createdRequest;
  }

  async getAllConsultationRequests(): Promise<ConsultationRequest[]> {
    return await db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt));
  }

  // Consultation operations (legacy)
  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const [createdConsultation] = await db.insert(consultations).values(consultation).returning();
    return createdConsultation;
  }

  async getAllConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations).orderBy(desc(consultations.createdAt));
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

  async getAvailableCaregivers(date: Date, duration: number): Promise<Caregiver[]> {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get caregivers who are available on this day of week
    const caregiverQuery = await db
      .select({
        id: caregivers.id,
        firstName: caregivers.firstName,
        lastName: caregivers.lastName,
        email: caregivers.email,
        phone: caregivers.phone,
        specialties: caregivers.specialties,
        hourlyRate: caregivers.hourlyRate,
        experience: caregivers.experience,
        certification: caregivers.certification,
        bio: caregivers.bio,
        isActive: caregivers.isActive,
        createdAt: caregivers.createdAt,
        updatedAt: caregivers.updatedAt,
        userId: caregivers.userId,
        profileImage: caregivers.profileImage,
        timezone: caregivers.timezone,
      })
      .from(caregivers)
      .innerJoin(caregiverAvailability, eq(caregivers.id, caregiverAvailability.caregiverId))
      .where(
        and(
          eq(caregivers.isActive, true),
          eq(caregiverAvailability.dayOfWeek, dayOfWeek),
          eq(caregiverAvailability.isAvailable, true)
        )
      );

    // Filter caregivers based on availability and existing appointments
    const availableCaregivers = [];
    for (const caregiver of caregiverQuery) {
      const isAvailable = await this.checkAvailability(caregiver.id, date, duration);
      if (isAvailable) {
        availableCaregivers.push(caregiver);
      }
    }
    
    return availableCaregivers;
  }

  // Caregiver availability operations
  async setCaregiverAvailability(availability: InsertCaregiverAvailability): Promise<CaregiverAvailability> {
    const [created] = await db.insert(caregiverAvailability).values(availability).returning();
    return created;
  }

  async getCaregiverAvailability(caregiverId: string): Promise<CaregiverAvailability[]> {
    return await db.select().from(caregiverAvailability)
      .where(eq(caregiverAvailability.caregiverId, caregiverId))
      .orderBy(caregiverAvailability.dayOfWeek);
  }

  async updateCaregiverAvailability(id: string, availabilityData: Partial<InsertCaregiverAvailability>): Promise<CaregiverAvailability> {
    const [updated] = await db
      .update(caregiverAvailability)
      .set(availabilityData)
      .where(eq(caregiverAvailability.id, id))
      .returning();
    return updated;
  }

  async deleteCaregiverAvailability(id: string): Promise<void> {
    await db.delete(caregiverAvailability).where(eq(caregiverAvailability.id, id));
  }

  // Caregiver time-off operations
  async createCaregiverTimeOff(timeOff: InsertCaregiverTimeOff): Promise<CaregiverTimeOff> {
    const [created] = await db.insert(caregiverTimeOff).values(timeOff).returning();
    return created;
  }

  async getCaregiverTimeOff(caregiverId: string): Promise<CaregiverTimeOff[]> {
    return await db.select().from(caregiverTimeOff)
      .where(eq(caregiverTimeOff.caregiverId, caregiverId))
      .orderBy(desc(caregiverTimeOff.startDate));
  }

  async updateCaregiverTimeOff(id: string, timeOffData: Partial<InsertCaregiverTimeOff>): Promise<CaregiverTimeOff> {
    const [updated] = await db
      .update(caregiverTimeOff)
      .set(timeOffData)
      .where(eq(caregiverTimeOff.id, id))
      .returning();
    return updated;
  }

  async deleteCaregiverTimeOff(id: string): Promise<void> {
    await db.delete(caregiverTimeOff).where(eq(caregiverTimeOff.id, id));
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

  // Cancel appointment with fee calculation
  async cancelAppointment(appointmentId: string, cancellationData: AppointmentCancellation): Promise<Appointment>;
  async cancelAppointment(appointmentId: string, reason?: string): Promise<Appointment>;
  async cancelAppointment(
    appointmentId: string,
    cancellation: string | AppointmentCancellation = "",
  ): Promise<Appointment> {
    const [cancelledAppointment] = await db
      .update(appointments)
      .set(buildAppointmentCancellationUpdate(cancellation))
      .where(eq(appointments.id, appointmentId))
      .returning();
    return cancelledAppointment;
  }

  async getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    return await db.select().from(appointments)
      .where(and(
        gte(appointments.scheduledDate, startDate),
        lte(appointments.scheduledDate, endDate)
      ))
      .orderBy(appointments.scheduledDate);
  }

  async confirmAppointment(id: string): Promise<Appointment> {
    const [appointment] = await db
      .update(appointments)
      .set({ 
        status: "confirmed", 
        confirmedAt: new Date(),
        updatedAt: new Date() 
      })
      .where(eq(appointments.id, id))
      .returning();
    return appointment;
  }

  // Scheduling operations
  async checkAvailability(caregiverId: string, date: Date, duration: number): Promise<boolean> {
    const dayOfWeek = date.getDay();
    const requestedTime = date.getHours() * 60 + date.getMinutes(); // minutes from midnight
    const endTime = requestedTime + duration;

    // Check caregiver's regular availability for this day of week
    const availability = await db.select().from(caregiverAvailability)
      .where(and(
        eq(caregiverAvailability.caregiverId, caregiverId),
        eq(caregiverAvailability.dayOfWeek, dayOfWeek),
        eq(caregiverAvailability.isAvailable, true)
      ));

    if (availability.length === 0) return false;

    // Check if requested time falls within any availability window
    const isWithinSchedule = availability.some(slot => {
      const [startHour, startMin] = slot.startTime!.split(':').map(Number);
      const [endHour, endMin] = slot.endTime!.split(':').map(Number);
      const slotStart = startHour * 60 + startMin;
      const slotEnd = endHour * 60 + endMin;
      
      return requestedTime >= slotStart && endTime <= slotEnd;
    });

    if (!isWithinSchedule) return false;

    // Check for time-off conflicts
    const timeOff = await db.select().from(caregiverTimeOff)
      .where(and(
        eq(caregiverTimeOff.caregiverId, caregiverId),
        lte(caregiverTimeOff.startDate, date),
        gte(caregiverTimeOff.endDate, date)
      ));

    if (timeOff.length > 0) return false;

    // Check for existing appointment conflicts
    const conflictingAppointments = await db.select().from(appointments)
      .where(and(
        eq(appointments.caregiverId, caregiverId),
        lte(appointments.scheduledDate, new Date(date.getTime() + duration * 60000)),
        gte(appointments.endDate, date),
        sql`status NOT IN ('cancelled', 'completed')`
      ));

    return conflictingAppointments.length === 0;
  }

  async getAvailableTimeSlots(caregiverId: string, date: Date, duration: number): Promise<{startTime: string, endTime: string}[]> {
    const dayOfWeek = date.getDay();
    const slots: {startTime: string, endTime: string}[] = [];

    // Get caregiver's availability for this day
    const availability = await db.select().from(caregiverAvailability)
      .where(and(
        eq(caregiverAvailability.caregiverId, caregiverId),
        eq(caregiverAvailability.dayOfWeek, dayOfWeek),
        eq(caregiverAvailability.isAvailable, true)
      ));

    if (availability.length === 0) return slots;

    // Check each availability window
    for (const window of availability) {
      const [startHour, startMin] = window.startTime!.split(':').map(Number);
      const [endHour, endMin] = window.endTime!.split(':').map(Number);
      
      // Generate 30-minute time slots within the window
      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = (hour === startHour ? startMin : 0); min < 60; min += 30) {
          if (hour === endHour && min >= endMin) break;
          
          const slotStart = new Date(date);
          slotStart.setHours(hour, min, 0, 0);
          
          const slotEnd = new Date(slotStart.getTime() + duration * 60000);
          
          // Don't exceed the availability window
          if (slotEnd.getHours() > endHour || 
              (slotEnd.getHours() === endHour && slotEnd.getMinutes() > endMin)) {
            break;
          }

          // Check if this slot is available
          const isAvailable = await this.checkAvailability(caregiverId, slotStart, duration);
          if (isAvailable) {
            slots.push({
              startTime: slotStart.toTimeString().slice(0, 5),
              endTime: slotEnd.toTimeString().slice(0, 5)
            });
          }
        }
      }
    }

    return slots;
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

  async getInvoicesByUserId(userId: string): Promise<Invoice[]> {
    // First find the client record for this user
    const [client] = await db.select().from(clients).where(eq(clients.userId, userId));
    if (!client) {
      return [];
    }
    return await db.select().from(invoices).where(eq(invoices.clientId, client.id))
      .orderBy(desc(invoices.createdAt));
  }

  async getBillingSummaryByUserId(userId: string): Promise<any> {
    const [client] = await db.select().from(clients).where(eq(clients.userId, userId));
    if (!client) {
      return { totalOutstanding: 0, totalInvoices: 0, paidThisMonth: 0, overdueCount: 0 };
    }

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [totalOutstanding] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(and(eq(invoices.clientId, client.id), eq(invoices.status, 'pending')));

    const [totalInvoices] = await db
      .select({ count: count() })
      .from(invoices)
      .where(eq(invoices.clientId, client.id));

    const [paidThisMonth] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(and(
        eq(invoices.clientId, client.id),
        eq(invoices.status, 'paid'),
        gte(invoices.paidAt, firstDayOfMonth)
      ));

    const [overdueCount] = await db
      .select({ count: count() })
      .from(invoices)
      .where(and(
        eq(invoices.clientId, client.id),
        eq(invoices.status, 'overdue')
      ));

    return {
      totalOutstanding: Number(totalOutstanding?.total || 0),
      totalInvoices: totalInvoices?.count || 0,
      paidThisMonth: Number(paidThisMonth?.total || 0),
      overdueCount: overdueCount?.count || 0,
    };
  }

  async getPaymentHistoryByUserId(userId: string): Promise<any[]> {
    const [client] = await db.select().from(clients).where(eq(clients.userId, userId));
    if (!client) {
      return [];
    }

    return await db
      .select({
        id: invoices.id,
        invoiceId: invoices.invoiceNumber,
        amount: invoices.total,
        paymentDate: invoices.paidAt,
        paymentMethod: invoices.paymentMethod,
        notes: invoices.notes,
      })
      .from(invoices)
      .where(and(eq(invoices.clientId, client.id), eq(invoices.status, 'paid')))
      .orderBy(desc(invoices.paidAt));
  }

  async getInvoiceItemsByInvoiceId(invoiceId: string): Promise<InvoiceItem[]> {
    return await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
  }

  // Caregiver schedule operations
  async getCaregiverSchedulesByWeek(startDate: Date, endDate: Date): Promise<any[]> {
    const results = await db
      .select()
      .from(appointments)
      .where(
        and(
          gte(appointments.scheduledDate, startDate),
          lte(appointments.scheduledDate, endDate)
        )
      )
      .orderBy(appointments.scheduledDate);

    // Transform the results to include formatted fields
    return results.map(appointment => ({
      id: appointment.id,
      caregiverId: appointment.caregiverId,
      clientId: appointment.clientId,
      date: appointment.scheduledDate,
      startTime: new Date(appointment.scheduledDate).toTimeString().slice(0, 5),
      endTime: new Date(appointment.endDate).toTimeString().slice(0, 5),
      serviceType: appointment.serviceType,
      status: appointment.status,
      clientName: 'Client Name',
      notes: appointment.clientNotes,
    }));
  }

  async getCaregiverSchedulesByCaregiver(caregiverId: string, startDate: Date, endDate: Date): Promise<any[]> {
    const results = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.caregiverId, caregiverId),
          gte(appointments.scheduledDate, startDate),
          lte(appointments.scheduledDate, endDate)
        )
      )
      .orderBy(appointments.scheduledDate);

    // Transform the results to include formatted fields
    return results.map(appointment => ({
      id: appointment.id,
      caregiverId: appointment.caregiverId,
      clientId: appointment.clientId,
      date: appointment.scheduledDate,
      startTime: new Date(appointment.scheduledDate).toTimeString().slice(0, 5),
      endTime: new Date(appointment.endDate).toTimeString().slice(0, 5),
      serviceType: appointment.serviceType,
      status: appointment.status,
      clientName: 'Client Name',
      notes: appointment.clientNotes,
    }));
  }

  async createCaregiverSchedule(scheduleData: any): Promise<any> {
    // This would create an appointment that becomes part of the schedule
    return await this.createAppointment(scheduleData);
  }

  async updateCaregiverSchedule(id: string, scheduleData: any): Promise<any> {
    return await this.updateAppointment(id, scheduleData);
  }

  async deleteCaregiverSchedule(id: string): Promise<void> {
    await this.deleteAppointment(id);
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

  // ===== APPOINTMENT REMINDERS =====
  
  async createAppointmentReminder(reminderData: InsertAppointmentReminder): Promise<AppointmentReminder> {
    const [reminder] = await db
      .insert(appointmentReminders)
      .values(reminderData)
      .returning();
    return reminder;
  }

  async getPendingReminders(): Promise<AppointmentReminder[]> {
    const now = new Date();
    return await db
      .select()
      .from(appointmentReminders)
      .where(
        and(
          eq(appointmentReminders.status, "pending"),
          lte(appointmentReminders.reminderTime, now)
        )
      )
      .orderBy(appointmentReminders.reminderTime);
  }

  async markReminderAsSent(reminderId: string): Promise<void> {
    await db
      .update(appointmentReminders)
      .set({ 
        status: "sent", 
        sentAt: new Date() 
      })
      .where(eq(appointmentReminders.id, reminderId));
  }

  async getAppointmentReminders(appointmentId: string): Promise<AppointmentReminder[]> {
    return await db
      .select()
      .from(appointmentReminders)
      .where(eq(appointmentReminders.appointmentId, appointmentId))
      .orderBy(appointmentReminders.reminderTime);
  }

  // ===== RECURRING APPOINTMENTS =====
  
  async createRecurringAppointment(recurringData: InsertRecurringAppointment): Promise<RecurringAppointment> {
    const [recurring] = await db
      .insert(recurringAppointments)
      .values(recurringData)
      .returning();
    return recurring;
  }

  async getRecurringAppointments(clientId?: string): Promise<RecurringAppointment[]> {
    const query = db.select().from(recurringAppointments);
    
    if (clientId) {
      return await query.where(
        and(
          eq(recurringAppointments.clientId, clientId),
          eq(recurringAppointments.isActive, true)
        )
      );
    }
    
    return await query.where(eq(recurringAppointments.isActive, true));
  }

  async updateRecurringAppointment(id: string, updateData: Partial<InsertRecurringAppointment>): Promise<RecurringAppointment> {
    const [updated] = await db
      .update(recurringAppointments)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(recurringAppointments.id, id))
      .returning();
    return updated;
  }

  async deactivateRecurringAppointment(id: string): Promise<void> {
    await db
      .update(recurringAppointments)
      .set({ isActive: false })
      .where(eq(recurringAppointments.id, id));
  }

  async generateRecurringAppointments(recurringId: string, daysAhead: number = 30): Promise<number> {
    const recurring = await db
      .select()
      .from(recurringAppointments)
      .where(eq(recurringAppointments.id, recurringId))
      .limit(1);

    if (!recurring.length || !recurring[0].isActive) {
      return 0;
    }

    const pattern = recurring[0];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysAhead);

    // Check if pattern has an end date
    if (pattern.endDate && pattern.endDate < endDate) {
      endDate.setTime(pattern.endDate.getTime());
    }

    let generatedCount = 0;
    const currentDate = new Date(Math.max(startDate.getTime(), pattern.startDate.getTime()));

    while (currentDate <= endDate) {
      let shouldGenerate = false;

      // Determine if appointment should be generated for this date
      switch (pattern.recurrencePattern) {
        case 'daily':
          shouldGenerate = true;
          break;
        case 'weekly':
          if (pattern.daysOfWeek) {
            const daysArray = JSON.parse(pattern.daysOfWeek);
            shouldGenerate = daysArray.includes(currentDate.getDay().toString());
          }
          break;
        case 'biweekly':
          if (pattern.daysOfWeek) {
            const daysArray = JSON.parse(pattern.daysOfWeek);
            const weeksSinceStart = Math.floor((currentDate.getTime() - pattern.startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
            shouldGenerate = weeksSinceStart % 2 === 0 && daysArray.includes(currentDate.getDay().toString());
          }
          break;
        case 'monthly':
          shouldGenerate = pattern.dayOfMonth === currentDate.getDate();
          break;
      }

      if (shouldGenerate) {
        // Check if appointment already exists for this date
        const existingAppointment = await db
          .select()
          .from(generatedAppointments)
          .where(
            and(
              eq(generatedAppointments.recurringAppointmentId, recurringId),
              eq(generatedAppointments.scheduledDate, currentDate)
            )
          )
          .limit(1);

        if (!existingAppointment.length) {
          // Create appointment for this date
          const appointmentDate = new Date(currentDate);
          const [hours, minutes] = pattern.startTime.split(':').map(Number);
          appointmentDate.setHours(hours, minutes, 0, 0);

          const endDate = new Date(appointmentDate.getTime() + pattern.duration * 60000);

          const [appointment] = await db
            .insert(appointments)
            .values({
              clientId: pattern.clientId,
              caregiverId: pattern.caregiverId,
              serviceId: pattern.serviceId,
              scheduledDate: appointmentDate,
              endDate,
              duration: pattern.duration,
              serviceType: "Recurring Care",
              status: "scheduled",
              priority: "normal",
              clientNotes: pattern.clientNotes,
              estimatedCost: "0",
            })
            .returning();

          // Link to recurring pattern
          await db
            .insert(generatedAppointments)
            .values({
              recurringAppointmentId: recurringId,
              appointmentId: appointment.id,
              scheduledDate: currentDate,
            });

          generatedCount++;
        }
      }

      // Move to next date
      currentDate.setDate(currentDate.getDate() + 1);

      // Check max occurrences
      if (pattern.maxOccurrences && generatedCount >= pattern.maxOccurrences) {
        break;
      }
    }

    return generatedCount;
  }

  // ===== ENHANCED APPOINTMENT BOOKING WITH REMINDERS =====
  
  async bookAppointmentWithReminders(
    appointmentData: InsertAppointment,
    reminderSettings?: Array<{
      type: 'email' | 'sms' | 'push';
      minutesBefore: number;
      message?: string;
    }>
  ): Promise<{ appointment: Appointment; reminders: AppointmentReminder[] }> {
    const [appointment] = await db
      .insert(appointments)
      .values(appointmentData)
      .returning();

    const reminders: AppointmentReminder[] = [];

    if (reminderSettings && reminderSettings.length > 0) {
      for (const setting of reminderSettings) {
        const reminderTime = new Date(appointmentData.scheduledDate.getTime() - setting.minutesBefore * 60000);
        
        const reminder = await this.createAppointmentReminder({
          appointmentId: appointment.id,
          reminderType: setting.type,
          reminderTime,
          timeBeforeAppointment: setting.minutesBefore,
          message: setting.message || `Reminder: You have an appointment scheduled for ${appointmentData.scheduledDate.toLocaleString()}`,
        });
        
        reminders.push(reminder);
      }
    }

    return { appointment, reminders };
  }
}

export const storage = new DatabaseStorage();
