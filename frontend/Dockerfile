FROM node:18-alpine AS build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/angular-template /usr/share/nginx/html

# Add the nginx/nginx.conf file to the image
COPY nginx/nginx.conf /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
