# ==========================================
# Stage 1: Build Frontend Assets
# ==========================================
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies with lockfile caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . ./
RUN npm run build

# ==========================================
# Stage 2: Production Nginx Server
# ==========================================
FROM nginx:alpine-slim AS final

# Remove default nginx configs
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom production nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled SPA assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
