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
WORKDIR /app

COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist/
COPY --from=builder /app/prisma prisma/

# Change ownership of files in app folder to node user
RUN chown -R node:node /app

# Run as non root user for security
USER node

EXPOSE 3000

# Run Prisma operations at *runtime* so DB URL exists
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/index.js"]
