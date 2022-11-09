FROM node:16-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN export $(cat .env)

EXPOSE 3000

CMD ["npm","run","dev"]