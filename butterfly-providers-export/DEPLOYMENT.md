# Butterfly Providers - Deployment Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database first
   npm run db:push
   ```

4. **Build & Start**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secure random string for session encryption
- `REPL_ID`: OAuth application ID (if using Replit Auth)
- `ISSUER_URL`: OAuth issuer URL
- `REPLIT_DOMAINS`: Comma-separated list of allowed domains

## Platform-Specific Deployment

### Vercel
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Railway
- Build Command: `npm run build`
- Start Command: `npm start`

### Render
- Build Command: `npm run build`
- Start Command: `npm start`

### Manual Server
```bash
npm install
npm run build
NODE_ENV=production npm start
```

## Database Migration
After setting up your database, run:
```bash
npm run db:push
```

This creates all necessary tables including:
- Users table (for authentication)
- Sessions table (for session storage)
- Contact inquiries table

## Authentication Notes
This app uses Replit Auth by default. For other platforms:
1. Create OAuth app on your chosen provider
2. Update environment variables accordingly
3. Or replace with Auth0, Firebase Auth, etc.

## Support
Contact: 602-830-0966
