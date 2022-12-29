FROM node:16-alpine

RUN mkdir -p /usr/src/vimu
WORKDIR /usr/src/vimu

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/vimu/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

ENV API_URL=http://localhost:5000
ENV POCKETBASE_URL=http://localhost:8090

CMD [ "npm", "start" ]