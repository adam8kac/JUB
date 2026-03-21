FROM node:20-bullseye-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-bullseye-slim

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/package.json /app/package-lock.json ./

RUN npm ci

EXPOSE 3000

CMD ["node", "dist/index.js"]