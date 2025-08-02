import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("client"), // client, admin, caregiver
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact inquiries table
export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

// Client signup schema
export const clientSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
});

export type ClientSignup = z.infer<typeof clientSignupSchema>;

// Clients table - extends user information for care management
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  emergencyContact: varchar("emergency_contact"),
  emergencyPhone: varchar("emergency_phone"),
  address: text("address"),
  medicalNotes: text("medical_notes"),
  careNotes: text("care_notes"),
  status: varchar("status").default("active"), // active, inactive, pending
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Caregivers table
export const caregivers = pgTable("caregivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique(),
  phone: varchar("phone"),
  certification: varchar("certification"),
  experience: integer("experience"), // years
  specialties: text("specialties"), // JSON array of specialties
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }),
  bio: text("bio"),
  profileImage: varchar("profile_image"),
  timezone: varchar("timezone").default("America/Phoenix"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Caregiver availability patterns (recurring schedule)
export const caregiverAvailability = pgTable("caregiver_availability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caregiverId: varchar("caregiver_id").references(() => caregivers.id),
  dayOfWeek: integer("day_of_week"), // 0 = Sunday, 1 = Monday, etc.
  startTime: varchar("start_time"), // HH:MM format
  endTime: varchar("end_time"), // HH:MM format
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Caregiver time-off and exceptions
export const caregiverTimeOff = pgTable("caregiver_time_off", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caregiverId: varchar("caregiver_id").references(() => caregivers.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  reason: varchar("reason"), // vacation, sick, personal, etc.
  isAllDay: boolean("is_all_day").default(true),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Appointments table - enhanced for online scheduling
export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id),
  caregiverId: varchar("caregiver_id").references(() => caregivers.id),
  serviceId: varchar("service_id").references(() => services.id),
  scheduledDate: timestamp("scheduled_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  duration: integer("duration").notNull(), // minutes
  serviceType: varchar("service_type").notNull(),
  status: varchar("status").default("scheduled"), // scheduled, confirmed, in-progress, completed, cancelled, no-show
  priority: varchar("priority").default("normal"), // low, normal, high, urgent
  location: varchar("location"), // home, facility, etc.
  specialInstructions: text("special_instructions"),
  estimatedCost: decimal("estimated_cost", { precision: 8, scale: 2 }),
  actualCost: decimal("actual_cost", { precision: 8, scale: 2 }),
  clientNotes: text("client_notes"),
  caregiverNotes: text("caregiver_notes"),
  adminNotes: text("admin_notes"),
  reminderSent: boolean("reminder_sent").default(false),
  bookedAt: timestamp("booked_at").defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  cancelledAt: timestamp("cancelled_at"),
  cancelReason: varchar("cancel_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Appointment recurring patterns
export const appointmentRecurring = pgTable("appointment_recurring", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  appointmentId: varchar("appointment_id").references(() => appointments.id),
  pattern: varchar("pattern").notNull(), // daily, weekly, biweekly, monthly
  interval: integer("interval").default(1), // every X days/weeks/months
  daysOfWeek: text("days_of_week"), // JSON array for weekly patterns
  endDate: timestamp("end_date"),
  maxOccurrences: integer("max_occurrences"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Care updates table
export const careUpdates = pgTable("care_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id),
  caregiverId: varchar("caregiver_id").references(() => caregivers.id),
  appointmentId: varchar("appointment_id").references(() => appointments.id),
  updateType: varchar("update_type").notNull(), // daily_report, incident, medication, vitals
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  priority: varchar("priority").default("normal"), // low, normal, high, urgent
  isReadByFamily: boolean("is_read_by_family").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 8, scale: 2 }),
  duration: integer("duration"), // minutes
  category: varchar("category"), // personal_care, companionship, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Invoices table - for billing records and invoice generation
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: varchar("invoice_number").notNull().unique(),
  clientId: varchar("client_id").references(() => clients.id),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  issueDate: timestamp("issue_date").defaultNow(),
  dueDate: timestamp("due_date").notNull(),
  status: varchar("status").default("pending"), // pending, paid, overdue, cancelled
  paymentMethod: varchar("payment_method"), // cash, check, bank_transfer, etc.
  paidAt: timestamp("paid_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Invoice line items - individual services on an invoice
export const invoiceItems = pgTable("invoice_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").references(() => invoices.id),
  appointmentId: varchar("appointment_id").references(() => appointments.id),
  serviceDescription: text("service_description").notNull(),
  quantity: decimal("quantity", { precision: 8, scale: 2 }).default("1"),
  rate: decimal("rate", { precision: 8, scale: 2 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  serviceDate: timestamp("service_date"),
});

// Billing table - simplified for payment tracking
export const billings = pgTable("billings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id),
  appointmentId: varchar("appointment_id").references(() => appointments.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  serviceDescription: varchar("service_description"),
  billingDate: timestamp("billing_date").defaultNow(),
  dueDate: timestamp("due_date"),
  status: varchar("status").default("pending"), // pending, paid, overdue, cancelled
  paymentMethod: varchar("payment_method"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin analytics table for tracking key metrics
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metric: varchar("metric").notNull(), // total_clients, active_appointments, revenue, etc.
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow(),
  metadata: jsonb("metadata"), // additional context
});

// Appointment reminders
export const appointmentReminders = pgTable("appointment_reminders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  appointmentId: varchar("appointment_id").references(() => appointments.id).notNull(),
  reminderType: varchar("reminder_type").notNull(), // 'email', 'sms', 'push'
  reminderTime: timestamp("reminder_time").notNull(), // When to send reminder
  timeBeforeAppointment: integer("time_before_appointment").notNull(), // Minutes before appointment
  status: varchar("status").default("pending"), // 'pending', 'sent', 'failed'
  message: text("message"), // Custom reminder message
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Recurring appointment patterns
export const recurringAppointments = pgTable("recurring_appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => users.id).notNull(),
  caregiverId: varchar("caregiver_id").references(() => caregivers.id).notNull(),
  serviceId: varchar("service_id").references(() => services.id),
  recurrencePattern: varchar("recurrence_pattern").notNull(), // 'daily', 'weekly', 'biweekly', 'monthly'
  recurrenceInterval: integer("recurrence_interval").default(1), // Every X units
  daysOfWeek: text("days_of_week"), // JSON array for weekly patterns: ["1", "3", "5"]
  dayOfMonth: integer("day_of_month"), // For monthly patterns
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // Optional end date
  maxOccurrences: integer("max_occurrences"), // Optional limit
  duration: integer("duration").notNull(), // minutes
  startTime: varchar("start_time").notNull(), // Format: "HH:MM"
  isActive: boolean("is_active").default(true),
  clientNotes: text("client_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Generated appointments from recurring patterns
export const generatedAppointments = pgTable("generated_appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  recurringAppointmentId: varchar("recurring_appointment_id").references(() => recurringAppointments.id).notNull(),
  appointmentId: varchar("appointment_id").references(() => appointments.id).notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCaregiverSchema = createInsertSchema(caregivers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCaregiverAvailabilitySchema = createInsertSchema(caregiverAvailability).omit({
  id: true,
  createdAt: true,
});

export const insertCaregiverTimeOffSchema = createInsertSchema(caregiverTimeOff).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentRecurringSchema = createInsertSchema(appointmentRecurring).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCareUpdateSchema = createInsertSchema(careUpdates).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({
  id: true,
});

export const insertBillingSchema = createInsertSchema(billings).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentReminderSchema = createInsertSchema(appointmentReminders).omit({
  id: true,
  createdAt: true,
  sentAt: true,
});

export const insertRecurringAppointmentSchema = createInsertSchema(recurringAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGeneratedAppointmentSchema = createInsertSchema(generatedAppointments).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertCaregiver = z.infer<typeof insertCaregiverSchema>;
export type Caregiver = typeof caregivers.$inferSelect;

export type InsertCaregiverAvailability = z.infer<typeof insertCaregiverAvailabilitySchema>;
export type CaregiverAvailability = typeof caregiverAvailability.$inferSelect;

export type InsertCaregiverTimeOff = z.infer<typeof insertCaregiverTimeOffSchema>;
export type CaregiverTimeOff = typeof caregiverTimeOff.$inferSelect;

export type InsertAppointmentRecurring = z.infer<typeof insertAppointmentRecurringSchema>;
export type AppointmentRecurring = typeof appointmentRecurring.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertCareUpdate = z.infer<typeof insertCareUpdateSchema>;
export type CareUpdate = typeof careUpdates.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type InsertBilling = z.infer<typeof insertBillingSchema>;
export type Billing = typeof billings.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;

export type InsertAppointmentReminder = z.infer<typeof insertAppointmentReminderSchema>;
export type AppointmentReminder = typeof appointmentReminders.$inferSelect;
export type InsertRecurringAppointment = z.infer<typeof insertRecurringAppointmentSchema>;
export type RecurringAppointment = typeof recurringAppointments.$inferSelect;
export type InsertGeneratedAppointment = z.infer<typeof insertGeneratedAppointmentSchema>;
export type GeneratedAppointment = typeof generatedAppointments.$inferSelect;
