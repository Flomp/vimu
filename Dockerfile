FROM node:16-alpine

RUN mkdir -p /usr/src/vimu
WORKDIR /usr/src/vimu

RUN apk update && apk upgrade
RUN apk add git

ENV API_URL=https://api.vimu.app
ENV POCKETBASE_URL=https://pb.vimu.app

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY . /usr/src/vimu/
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]