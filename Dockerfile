FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable pnpm && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build && \
    pnpm store prune

FROM node:23-alpine AS deployer
WORKDIR /app
COPY --from=builder /app/build build/
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable pnpm && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --prod --frozen-lockfile && \
    pnpm store prune && \
    npm uninstall -g pnpm && \
    rm -rf ~/.pnpm-store ~/.pnpm
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
