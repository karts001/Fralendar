# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

# Install dependencies including TypeScript
COPY package.json package-lock.json tsconfig*.json vite.config.ts index.html ./
RUN npm ci --also=dev

# Define ENV variables required for build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_BACKEND_API_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL


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