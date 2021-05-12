FROM node:latest

# create app directory
WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ .

RUN npm run build

RUN npm run db

EXPOSE 4000
CMD [ "npm", "start"]


