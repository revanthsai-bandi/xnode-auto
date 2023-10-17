# Install & Build
FROM node:18-alpine as build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Start Server
FROM nginx:alpine
COPY --from=build /app/dist/angular-template /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
