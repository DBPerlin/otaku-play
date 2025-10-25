FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=optional

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --omit=optional --legacy-peer-deps

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]