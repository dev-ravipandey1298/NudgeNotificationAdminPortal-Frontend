FROM node:22.8-alpine3.20 as nodework
WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . .
RUN npm build


FROM ngnix:stable-alpine3.20-perl
WORKDIR /usr/share/ngnix/html
RUN rm -rf ./*
COPY --from=nodework /myapp/build .
ENTRYPOINT [ "ngnix", "-g", "daemon off;" ]