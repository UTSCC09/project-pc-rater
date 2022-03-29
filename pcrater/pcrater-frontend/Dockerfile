FROM node:14-slim

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 80

EXPOSE 3000

CMD [ "npm", "start" ]