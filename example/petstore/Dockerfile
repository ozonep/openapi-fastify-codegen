FROM node:13-alpine

WORKDIR /usr/app

EXPOSE 8080

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "src/bin/www"]