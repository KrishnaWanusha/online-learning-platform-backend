FROM node:14

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=6000

EXPOSE 6000

CMD [ "npm" , "run", "dev"]