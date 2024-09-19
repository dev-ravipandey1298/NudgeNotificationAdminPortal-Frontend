# Stage 1: Build React App
FROM node:22.8-alpine3.20 as buildstage
WORKDIR /myapp
COPY package.json ./
RUN npm install
ENV VITE_BASE_URL=/dp/portal/notification/
COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:stable-alpine3.20
WORKDIR /usr/share/nginx/html

# Remove the default Nginx content
RUN rm -rf ./*

# Copy React build output
COPY --from=buildstage /myapp/build /usr/share/nginx/html/

# Copy health check file (optional)
COPY --from=buildstage /myapp/public/health.html /usr/share/nginx/html/health.html

# Replace the default Nginx configuration with custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]