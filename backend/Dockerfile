# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

# Force Railway to rebuild all layers
RUN echo "🚀 Force rebuild"

# Install dependencies including TypeScript
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --also=dev

# Copy Prisma schemas
COPY prisma ./prisma

# Copy source code
COPY src ./src

# Generate Prisma Client
RUN npx prisma generate

# Build
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Stage 2: Production
FROM node:22-slim

# Install OpenSSL (CRITICAL: Prisma requires this)
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Swap to node user for security
USER node

# Set working directory to inside node home fodler to avoid ownership issues
WORKDIR /home/node/app

# Copy build files
COPY --from=builder --chown=node:node /app/package.json package.json
COPY --from=builder --chown=node:node /app/node_modules node_modules
COPY --from=builder --chown=node:node /app/dist dist/
COPY --from=builder --chown=node:node /app/prisma prisma/

EXPOSE 3000

# Run Prisma operations at *runtime* so DB URL exists
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/index.js"]
