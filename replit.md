# Butterfly Providers - Non-Medical Home Care Services

## Overview

This is a full-stack web application for Butterfly Providers, a non-medical home care services company. The application features a marketing landing page with service information, contact forms, and a secure client portal with authentication. Built using modern web technologies with a focus on user experience and professional presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- Enhanced scheduling system with advanced appointment management features (January 30, 2025)
- Added appointment reminders with email/SMS notifications and customizable timing options
- Implemented recurring appointments with daily/weekly/biweekly/monthly patterns
- Created day selection interface for weekly patterns and maximum occurrence limits
- Built tabbed booking dialog with Details/Recurring/Reminders sections for improved UX
- Added comprehensive backend API routes for enhanced and recurring appointment bookings
- Integrated reminder creation system with appointment booking workflow
- Enhanced mobile optimization and accessibility for scheduling interface
- Fixed Lisa Rodriguez profile picture in testimonials section with fallback avatars
- Implemented comprehensive billing and invoice management system (January 30, 2025)
- Added invoice generation with automatic numbering (BP-YYYYMM-####)
- Created invoice line items for detailed service billing
- Built complete invoice API with CRUD operations and payment tracking
- Added professional invoice management interface in admin dashboard
- Enhanced database schema with invoices, invoice_items, appointment_reminders, and recurring_appointments tables
- Implemented comprehensive admin dashboard with full CRUD operations (January 30, 2025)
- Added admin authentication middleware and role-based access control  
- Created complete admin storage layer with analytics and dashboard stats
- Built admin API routes for users, clients, caregivers, appointments, services, billing
- Updated hero section image to show young woman caregiver helping elderly woman (January 30, 2025)
- Replaced Replit OAuth with universal email/password authentication system (February 2, 2025)
- Added secure bcrypt password hashing and comprehensive authentication API routes
- Created professional login and registration pages with form validation and error handling
- Updated database schema with password authentication fields (password_hash, email_verified, reset_token)
- Implemented platform-independent authentication supporting deployment to any domain
- Successfully tested complete authentication flow: registration, login, logout, and session management
- Removed platform dependency limitations enabling deployment to butterflyproviders.com
- Website is fully mobile-responsive with hamburger menu and adaptive layouts
- Added comprehensive site navigation with "Back to Home" buttons across all major pages (February 2, 2025)
- Enhanced Hero section with direct links to scheduling demo, cancellation policies, and caregiver information
- Improved user experience with consistent navigation patterns throughout the application
- All standalone pages now include navigation breadcrumbs for easy return to main website
- Optimized header and footer to ultra-compact sizes while maintaining large logos (February 2, 2025)
- Implemented fixed height containers (136px) with negative margins and overflow clipping for space efficiency
- Header uses zero padding (py-0) with logo extending beyond visible boundaries via overflow hidden
- Footer restructured to horizontal layout with logo on left and compact three-column content grid on right
- Both sections maintain full-size logos (h-72) for maximum brand visibility and readability
- Enhanced mobile responsiveness and user experience with comprehensive improvements (February 5, 2025)
- Added responsive logo sizing (h-56 sm:h-64 md:h-72) to prevent overflow on small screens
- Implemented smooth animations, hover effects, and micro-interactions throughout the application
- Created ScrollToTop component with smooth scrolling behavior for better navigation
- Added adaptive typography with responsive text sizing across all components
- Enhanced form interactions with smooth transitions and improved focus states
- Optimized mobile spacing and layout for contact forms and service cards
- Added custom CSS animations for fade-in effects and improved visual feedback
- Implemented better accessibility with proper focus styles and ARIA labels
- Created enhanced loading states and skeleton UI components for better UX

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL storage
- **Database ORM**: Drizzle ORM for type-safe database operations

### Design System
- **Component Library**: shadcn/ui with "new-york" style
- **Theme**: Custom butterfly-inspired color palette with brand colors
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Typography**: Clean, professional styling with proper contrast ratios

## Key Components

### Authentication System
- **Provider**: Replit Auth with automatic OIDC discovery
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **User Management**: Automatic user creation/updates on login
- **Protected Routes**: Middleware-based route protection for API endpoints

### Database Schema
- **Users Table**: Stores user profile information (required for Replit Auth)
- **Sessions Table**: Express session storage (required for Replit Auth)
- **Contact Inquiries**: Stores form submissions from potential clients
- **Schema Validation**: Zod schemas for runtime type checking

### Client Portal Features
- **Dashboard**: Overview of care updates and appointments
- **Care Updates**: Real-time notes and status updates from caregivers
- **Appointment Management**: Schedule viewing and management
- **Secure Messaging**: Communication with care team
- **Billing Information**: Payment and invoice management

### Marketing Components
- **Hero Section**: Professional presentation with clear call-to-action
- **Services Grid**: Detailed service offerings with icons and descriptions
- **Testimonials**: Client feedback with star ratings
- **Contact Form**: Lead generation with form validation
- **About Section**: Company credentials and trust indicators

## Data Flow

### Authentication Flow
1. User accesses protected route or clicks login
2. Redirected to Replit OIDC provider
3. Successful auth creates/updates user record
4. Session established with secure cookie
5. Subsequent requests authenticated via session middleware

### Contact Form Flow
1. User submits contact form on landing page
2. Client-side validation using Zod schemas
3. Form data sent to API endpoint via fetch
4. Server validates and stores inquiry in database
5. Success/error feedback displayed to user

### Client Portal Flow
1. Authenticated user accesses dashboard endpoint
2. Server fetches user-specific data (care updates, appointments)
3. Data returned as JSON and cached by React Query
4. UI updates reactively based on data state

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL (via Neon serverless)
- **Authentication**: Replit Auth OIDC provider
- **UI Framework**: React with TypeScript
- **Styling**: Tailwind CSS with PostCSS processing

### Key Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **@radix-ui/**: Accessible UI component primitives
- **express-session**: Session management with PostgreSQL store
- **zod**: Runtime schema validation
- **wouter**: Lightweight client-side routing

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Production bundling for server code
- **Replit plugins**: Development environment integration

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with HMR for client code
- **API Server**: Express server with TypeScript compilation via tsx
- **Database**: Neon PostgreSQL with connection pooling
- **File Watching**: Automatic restart on server file changes

### Production Build
- **Client Build**: Vite production build with optimizations
- **Server Build**: ESBuild bundling for Node.js deployment
- **Static Assets**: Served from dist/public directory
- **Database Migrations**: Drizzle Kit for schema management

### Environment Configuration
- **Database URL**: PostgreSQL connection string (required)
- **Session Secret**: Secure session signing key (required)
- **Replit Integration**: OIDC and domain configuration
- **Build Optimization**: Tree shaking and code splitting enabled

### Security Considerations
- **HTTPS Only**: Secure cookie settings for production
- **CSRF Protection**: Express built-in protections
- **Input Validation**: Zod schemas on all user inputs
- **Authentication**: Secure session management with PostgreSQL storage
- **Database**: Parameterized queries via Drizzle ORM