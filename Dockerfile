FROM node:12-buster as build

WORKDIR /app

COPY . .

ENV WEBSOCKET_URL=ws://localhost:8986
ENV GENERAL_CHANNEL=general
ENV USER_ENDPOINT=http://localhost:8986/api/users
ENV MESSAGE_ENDPOINT=http://localhost:8986/api/channels
ENV CHANNEL_ENDPOINT=http://localhost:8986/api/messages
ENV IMAGE_ENDPOINT=http://localhost:8986/api/images


RUN npm install && \
    npm install -g bower && \
    bower install --allow-root && \
    npm run build

FROM nginx:alpine as main


COPY --from=build /app/build /usr/share/nginx/html
COPY smarthse.conf /etc/nginx/conf.d/default.conf
