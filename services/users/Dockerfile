FROM node:25-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build 

FROM node:25-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY src/protos ./dist/src/protos
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/src/index.js"]