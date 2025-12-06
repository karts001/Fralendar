# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

# Force Railway to rebuild all layers
RUN echo "🚀 Force rebuild"

# Install dependencies including TypeScript
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --also=dev

# Define ENV variables
ARG DATABASE_URL
ENV DATABASE_URL="$DATABASE_URL"

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

# Add DATABASE_URL from Railway service variables
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Run as non root user for security
USER node

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]
