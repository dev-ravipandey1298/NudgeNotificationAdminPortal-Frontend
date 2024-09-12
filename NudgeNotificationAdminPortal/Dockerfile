#  Node.js 
FROM node:22.8-alpine3.20 as buildstage
WORKDIR /myapp
COPY package.json ./
RUN npm install
COPY . . 
RUN npm run build

#  Nginx
FROM nginx:stable-alpine3.20
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=buildstage /myapp/dist ./
CMD ["nginx", "-g", "daemon off;"]
