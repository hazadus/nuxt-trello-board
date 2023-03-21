# Dockerfile
FROM node:18-alpine3.16

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm ci
RUN npm run build

EXPOSE 3000

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]