FROM node:latest

# create app directory
WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ .

RUN npm run build

RUN npm run db

RUN npm run db-generate

EXPOSE 3000
CMD [ "npm", "start"]


