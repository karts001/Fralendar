# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

# Install dependencies including TypeScript
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --also=dev

# Copy source code
COPY src ./src

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

# Run as non root user for security
USER node

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
