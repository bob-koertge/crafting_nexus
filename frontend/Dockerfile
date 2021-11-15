FROM node:16-buster

WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json .

RUN npm install --silent

EXPOSE 3000

CMD npm start