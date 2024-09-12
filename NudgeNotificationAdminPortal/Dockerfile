#  Node.js 
FROM node:22.8-alpine3.20 as buildstage
WORKDIR /myapp
COPY ./package.json  /myapp
RUN npm install
COPY . /myapp 

RUN npm run dev