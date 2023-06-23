FROM node:alpine

WORKDIR /usr/src/app/apí

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800

CMD ["npm", "start"]