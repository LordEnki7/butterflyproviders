# Butterfly Providers - Non-Medical Home Care Services

## Overview
This project is a full-stack web application for Butterfly Providers, a non-medical home care services company. Its primary purpose is to provide a marketing landing page and a secure client portal. Key capabilities include service information display, contact forms, authentication, scheduling, billing, and client management. The business vision is to offer a professional and user-friendly platform for non-medical home care services, enhancing client interaction and operational efficiency.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query)
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with custom styling
- **Design System**: shadcn/ui ("new-york" style), butterfly-inspired color palette, mobile-first responsive design, adaptive typography.
- **UI/UX Decisions**: Animated hamburger menu, scroll-based header effects, smooth animations, hover effects, and micro-interactions throughout. Responsive logo sizing, adaptive typography, enhanced loading states, and skeleton UI components.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Custom email/password system with bcrypt hashing.
- **Session Management**: Express sessions with PostgreSQL storage
- **Database ORM**: Drizzle ORM
- **Core Features**: Comprehensive admin dashboard with CRUD operations for users, clients, caregivers, appointments, services, and billing. Secure authentication with role-based access control.

### Technical Implementations
- **Authentication System**: Email/password authentication with bcrypt, secure API routes, login/registration pages with validation, and platform-independent deployment.
- **Database Schema**: Includes tables for users, sessions, contact inquiries, invoices, invoice_items, appointment_reminders, and recurring_appointments.
- **Client Portal Features**: Dashboard for care updates, appointment management, secure messaging, and billing information.
- **Marketing Components**: Hero section, services grid, testimonials, contact form, and about section.
- **Scheduling System**: Advanced appointment management including reminders (email/SMS), recurring appointments (daily/weekly/biweekly/monthly patterns), and a tabbed booking dialog.
- **Billing System**: Invoice generation with automatic numbering, detailed service line items, and a complete invoice API with CRUD and payment tracking.
- **Navigation**: Comprehensive site navigation with "Back to Home" buttons, navigation breadcrumbs, redesigned header/footer for compactness and brand visibility, and a floating action menu.

### System Design Choices
- **Responsive Design**: Fully mobile-responsive with hamburger menu, adaptive layouts, and responsive component sizing.
- **Layout**: Fixed header with specific height (74px) and overflow styling for larger logos. Consolidated contact information in the footer.
- **Security**: HTTPS only, CSRF protection, input validation via Zod schemas, secure session management, and parameterized queries.

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL (via Neon serverless)
- **UI Framework**: React
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation (formerly Replit Auth OIDC provider)

### Key Libraries
- **@tanstack/react-query**: Server state management and caching.
- **drizzle-orm**: Type-safe database operations.
- **@radix-ui/**: Accessible UI component primitives.
- **express-session**: Session management.
- **zod**: Runtime schema validation.
- **wouter**: Lightweight client-side routing.
- **bcrypt**: Password hashing.

### Development Tools
- **Vite**: Build tool and development server.
- **TypeScript**: Static type checking.
- **ESBuild**: Production bundling for server code.