# Dockerfile
FROM node:18-alpine3.16

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade

# copy the app, note .dockerignore
COPY . /usr/src/app/
RUN npm ci
RUN npm run build

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]