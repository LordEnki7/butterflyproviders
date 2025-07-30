# Butterfly Providers - Export Package Guide

## Files to Include for Deployment

### Core Application Files
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── db.ts
│   ├── replitAuth.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── components.json
├── drizzle.config.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── attached_assets/ (if using local images)
```

### Files to EXCLUDE (Replit-specific)
```
.replit
replit.md (contains Replit-specific documentation)
```

## Environment Variables Required

Create a `.env` file with these variables:
```
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
REPL_ID=your_oauth_app_id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.com
NODE_ENV=production
```

## Database Setup
1. Create PostgreSQL database
2. Run: `npm run db:push` to create tables
3. Ensure connection string is set in DATABASE_URL

## Build Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Database migration: `npm run db:push`

## Platform-Specific Notes

### Vercel/Netlify
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18+

### Railway/Render
- Start command: `npm start`
- Build command: `npm run build`
- Environment: Node.js 18+

### Docker (if needed)
- Base image: `node:18-alpine`
- Install dependencies: `npm ci`
- Build: `npm run build`
- Start: `npm start`

## Authentication Setup
You'll need to:
1. Create OAuth app on your chosen platform
2. Update REPL_ID and ISSUER_URL accordingly
3. Or replace Replit Auth with another provider (Auth0, Firebase, etc.)

## Key Dependencies
All dependencies are listed in package.json - no additional setup needed.