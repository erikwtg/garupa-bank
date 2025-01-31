FROM node:22.12.0 AS base
WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .
RUN chown -R node:node /app
RUN npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules /app/node_modules

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
