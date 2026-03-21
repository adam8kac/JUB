FROM node:25-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN npm ci

COPY . .

RUN npm run build

FROM node:25-slim

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/package.json /app/package-lock.json ./

ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]