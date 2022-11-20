FROM node:16-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN export $(cat .env)

RUN npm run build

EXPOSE 3333

CMD ["npm","run","start"]