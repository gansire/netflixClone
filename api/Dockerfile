FROM node:18-alpine

WORKDIR /user/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8800

CMD ["npm","start"]