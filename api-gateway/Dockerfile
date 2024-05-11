FROM node:14

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm" , "run", "dev"]