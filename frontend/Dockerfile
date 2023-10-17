# Install & Build
FROM node:18-alpine as build
ARG ENVNAME
ENV P=${ENVNAME}
WORKDIR /app
COPY ./package.json /app/
RUN npm run i
COPY . /app
RUN npm run build:$P

# Start Server
FROM nginx:alpine
COPY --from=build /app/dist/angular-template /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
