FROM node:19.0.0-alpine as build
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

CMD cp .env.example .env && npm install && npm run dev