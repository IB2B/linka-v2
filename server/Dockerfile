FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
EXPOSE 4000
CMD ["sh", "-c", "npx tsx src/scripts/migrate.ts && npx tsx src/index.ts"]
