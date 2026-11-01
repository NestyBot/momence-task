FROM docker.io/oven/bun:1-alpine
RUN apk add --no-cache tini
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production PORT=3000
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bun", "./server.ts"]
