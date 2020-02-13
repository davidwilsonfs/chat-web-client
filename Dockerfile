FROM node:8-alpine as build

WORKDIR /app

COPY . .

FROM nginx:alpine as main

COPY --from=build /app/build /usr/share/nginx/html
COPY smarthse.conf /etc/nginx/conf.d/default.conf
