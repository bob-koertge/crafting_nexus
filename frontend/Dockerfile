FROM node:16-buster

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install --silent
RUN npm install -g jshint

COPY . /app/

EXPOSE 3000

CMD npm start dev:watch