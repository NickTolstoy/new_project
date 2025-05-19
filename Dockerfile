FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

# При необходимости добавим Express-сервер для обслуживания
COPY server.js /app/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"] 