#!/bin/bash

# Butterfly Providers - Export Package Creator
# This script creates a deployment-ready package excluding Replit-specific files

echo "Creating Butterfly Providers export package..."

# Create export directory
mkdir -p butterfly-providers-export

# Copy essential application files
echo "Copying application files..."

# Copy client directory (excluding node_modules if present)
cp -r client butterfly-providers-export/
find butterfly-providers-export/client -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# Copy server directory
cp -r server butterfly-providers-export/

# Copy shared directory
cp -r shared butterfly-providers-export/

# Copy configuration files
cp package.json butterfly-providers-export/
cp package-lock.json butterfly-providers-export/
cp tsconfig.json butterfly-providers-export/
cp vite.config.ts butterfly-providers-export/
cp tailwind.config.ts butterfly-providers-export/
cp postcss.config.js butterfly-providers-export/
cp drizzle.config.ts butterfly-providers-export/
cp components.json butterfly-providers-export/

# Copy assets if they exist
if [ -d "attached_assets" ]; then
    echo "Copying attached assets..."
    cp -r attached_assets butterfly-providers-export/
fi

# Create .env.example file
echo "Creating .env.example..."
cat > butterfly-providers-export/.env.example << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Session Security
SESSION_SECRET=your-super-secure-session-secret-here

# OAuth Configuration (for Replit Auth)
REPL_ID=your-oauth-app-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.com,www.your-domain.com

# Environment
NODE_ENV=production
EOF

# Create deployment README
echo "Creating deployment README..."
cat > butterfly-providers-export/DEPLOYMENT.md << 'EOF'
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
EOF

# Create .gitignore for the export
echo "Creating .gitignore..."
cat > butterfly-providers-export/.gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Database
*.db
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF

# Create the ZIP file
echo "Creating ZIP archive..."
zip -r butterfly-providers-export.zip butterfly-providers-export/ -x "*.git*" "*/node_modules/*"

echo "✅ Export package created successfully!"
echo "📦 File: butterfly-providers-export.zip"
echo "📁 Directory: butterfly-providers-export/"
echo ""
echo "Ready for deployment on any platform!"
echo "See DEPLOYMENT.md in the package for platform-specific instructions."
EOF