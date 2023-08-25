---
title: Self hosting - Installation
description: You can install and run vimu on any operating system that can run a Docker CLI or has python, NodeJS, and go installed. You can use vimu on your local machine or a cloud provider of your choice. You can either install it bare-metal or use Docker.
---

# Installation

You can install and run **vimu** on any operating system that can run a Docker CLI or has ```python```, ```NodeJS```, and ```go``` installed. You can use **vimu** on your local machine or a cloud provider of your choice. You can either install it bare-metal or use Docker.

## System requirements

**vimu** is designed to run well on both small and large deployments. The minimum requirements to run **vimu** are as little as 1 CPU core and 2GB of RAM.

Should you opt to run **vimu** with Docker, make sure your Docker installation is updated to support Composer V2.

## Get the code

In any case, the first step is to obtain the code for **vimu** from GitHub.

```bash
# vimu
git clone https://github.com/Flomp/vimu.git

# vimu-engine
git clone https://github.com/Flomp/vimu-engine.git

# vimu-pocketbase
git clone https://github.com/Flomp/vimu-pocketbase.git

```

## Environment

**vimu** expects a few environment variables to be present when launched. Where you define these variables depends on the way you install **vimu**.

### Docker
With Docker, you can conveniently define all variables in your docker-compose file (see below).

### Bare-metal

With a bare-metal installation, you can either export the variables directly on your machine or put them in separate ```.env``` files in the respective component's folder.

### Variables
<br>

| Name           | Description                                                                                                     | Required | Used by                            |
| :------------- | :-------------------------------------------------------------------------------------------------------------- | :------- | :--------------------------------- |
| APP_URL        | The URL under which vimu will be available (e.g. https://vimu.app)                                              | Yes      | vimu, vimu-engine, vimu-pocketbase |
| API_URL        | The URL under which vimu-engine will be available (e.g. https://api.vimu.app)                                   | Yes      | vimu                               |
| POCKETBASE_URL | The URL under which vimu-pocketbase will be available (e.g. https://pb.vimu.app)                                | Yes      | vimu, vimu-engine                  |
| REDIS_URL      | URL to a redis installation (e.g. redis://localhost:6379). Only needed if you want vimu-engine to cache results | No       | vimu-engine                        |
| ALLOW_PLUGINS  | Allow the usage of plugins on the server side (see security warning). Default: False                            | No       | vimu-engine                        |

### Security

<div role="alert" class="v-alert v-sheet v-alert--prominent v-alert--text error--text"><div class="v-alert__wrapper"><i class="v-icon v-alert__icon mdi mdi-alert error--text"></i><div class="v-alert__content"> Only enable the ALLOW_PLUGINS flag if you really know what you are doing. Plugins allow users to execute untrusted code on your server. Be extremely careful how you set up your environment to mitigate remote code execution attacks. Failing to do so can give an attacker complete control of your systems.  </div></div></div>

## Install with Docker

The quickest and easiest way to run **vimu** is by using Docker. Make sure you have installed the <a href="https://www.docker.com/products/docker-desktop">Docker CLI</a> on your machine before proceeding.

Navigate to the root folder that contains vimu, vimu-engine & vimu-pocketbase. Create a ```docker-compose.yml``` with the following content.

```yml[docker-compose.yml]
version: "3.9"
services:
  vimu:
    container_name: vimu
    build:
      context: ./vimu
      args:
        APP_URL: $APP_URL
        API_URL: $API_URL
        POCKETBASE_URL: $POCKETBASE_URL
    ports:
      - "3000:3000"
  vimu-engine:
    container_name: vimu-engine
    build: ./vimu-engine
    environment:
      - APP_URL=$APP_URL
      - POCKETBASE_URL=$POCKETBASE_URL
      - POCKETBASE_ADMIN_EMAIL=$POCKETBASE_ADMIN_EMAIL
      - POCKETBASE_ADMIN_PASSWORD=$POCKETBASE_ADMIN_PASSWORD
      - REDIS_URL=$REDIS_URL
    ports:
      - "5000:5000"
  vimu-pocketbase:
    container_name: vimu-pocketbase
    build:
      context: ./vimu-pocketbase
    environment:
      - APP_URL=$APP_URL
    ports:
      - "8090:8090"
    volumes:
      - /data/vimu-pocketbase:/pb_data
# Optional redis cache 
  vimu-redis:
    container_name: vimu-redis
    image: redis:latest
    entrypoint: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - /data/vimu-redis:/data
```
<br>

### Start

You can bring the containers up by using the following command executed from the same directory as your ```docker-compose.yml``` file.

```bash
# Start
docker compose up -d
```

### Stop

You can stop your **vimu** containers by using the following command.

```bash
# Stop
docker compose stop
```

### Uninstall

To stop and remove your **vimu** containers, you can use the following.

```bash
# Uninstall
docker compose down -v
```

## Install bare-metal

### Prerequisites

You need to have ```NodeJS>=16.15.1```, ```python>=3.10```, and ```go>=1.19.5``` installed on your machine.

### vimu

```bash
cd ./vimu
# install dependencies
npm install
# neccessary for nodejs 17 and up
export NODE_OPTIONS=--openssl-legacy-provider
# build with nuxt
npm run build
# start vimu
npm start
```

### vimu-engine

```bash
cd ./vimu-engine
# install dependencies
pip install --no-cache-dir --upgrade -r requirements.txt
# start vimu-engine
uvicorn main:app --host 0.0.0.0 --port 5000
```

### vimu-pocketbase

```bash
cd ./vimu-pocketbase
# install dependencies
go mod download
# build
go build -o ./vimu-pocketbase
# migrate database
./vimu-pocketbase migrate
# start vimu-pocketbase
./vimu-pocketbase serve --http=0.0.0.0:8090 --dir=./pb_data
```