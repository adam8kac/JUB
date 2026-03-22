FROM node:25-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN npm ci

COPY . .

RUN npm run build

FROM node:25-slim

WORKDIR /app

# Install Chromium and its dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]
