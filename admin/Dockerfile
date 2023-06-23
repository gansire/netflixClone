FROM node:alpine

WORKDIR /usr/src/app/admin

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]