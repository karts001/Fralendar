# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

# Install dependencies including TypeScript
COPY package.json package-lock.json tsconfig*.json vite.config.ts index.html ./
RUN npm ci --also=dev

# Copy source code
COPY src ./src

# Build
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Stage 2: Production
FROM nginx:alpine
# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]