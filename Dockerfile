# Next.js Frontend Dockerfile
# Multi-stage build for production optimization

# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./

# Install ALL dependencies (including devDependencies for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js application
RUN yarn build

# ---------- Production Stage ----------
FROM node:22-alpine AS production

WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./

# Install ONLY production dependencies
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose application port
EXPOSE 3000

# Healthcheck (TCP liveness on the app's real port)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "const net=require('net');const p=process.env.PORT||3000;const s=net.connect(p,'127.0.0.1',()=>process.exit(0));s.on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),5000)"

# Run the application
CMD ["yarn", "start"]
