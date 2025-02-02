FROM node:22.12.0 AS runtime
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["node", "--watch", "--experimental-strip-types", "index.ts"]