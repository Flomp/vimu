FROM node:16-alpine

ARG APP_URL
ARG API_URL
ARG POCKETBASE_URL

RUN mkdir -p /usr/src/vimu
WORKDIR /usr/src/vimu

RUN apk update && apk upgrade
RUN apk add git

ENV APP_URL=${APP_URL}
ENV API_URL=${API_URL}
ENV POCKETBASE_URL=${POCKETBASE_URL}

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY . /usr/src/vimu/
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]