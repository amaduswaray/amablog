FROM node:20.19 AS builder
WORKDIR /app
COPY package*.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build
RUN pnpm prune --prod

FROM node:20.19 AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .

expose 3000

ENV NODE_ENV=production

CMD ["node", "build"]
