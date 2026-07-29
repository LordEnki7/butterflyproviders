# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDeps needed for the build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev --omit=optional

# Copy built output from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the server listens on
EXPOSE 5000

# Environment variables — set these in Dokploy
# NEON_DATABASE_URL=...
# SESSION_SECRET=...
# NODE_ENV=production

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "dist/index.js"]
