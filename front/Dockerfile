FROM node:8.15

RUN mkdir -p /usr/app

WORKDIR /usr/app

ADD ./package.json ./
ADD ./package-lock.json ./

RUN npm install

