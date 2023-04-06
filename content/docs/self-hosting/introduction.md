---
title: Self hosting - Introduction
description: This section of the documentation will explain how you can get vimu up and running on your own system. Please note that this guide assumes a fair amount of technical knowledge regarding JavaScript, Python, and Docker.
---

# Introduction

This section of the documentation will explain how you can get **vimu** up and running on your own system. Please note that this guide assumes a fair amount of technical knowledge regarding JavaScript, Python, and Docker.

**vimu** consists of three main components:
1. vimu - The frontend that you currently see
2. vimu-engine - The stateless API backend
3. vimu-pocketbase -  The persistent data storage backend

## vimu

GitHub: <a href="https://github.com/Flomp/vimu">vimu</a>

**vimu's** frontend is written with the VueJS framework and uses nuxt as a meta-framework. It contains all the code for the website including the editor. The editor itself builds on the retejs library but performs the graph calculation on the server side (see below).

## vimu-engine

GitHub: <a href="https://github.com/Flomp/vimu-engine">vimu-engine</a>

As the name suggests vimu-engine is the motor that powers **vimu**. It is written with python and the FastAPI framework and is completely stateless. Its most integral part is a rewrite of the retejs engine in python allowing for fast and easy computation of the node graph data that **vimu** sends from the frontend editor to the engine on the server side. The client sends the current editor state as JSON to the engine where it gets processed. We then return the resulting MusicXML data back to the client where it is displayed. For processing, vimu-engine contains multiple repositories that each hold classes corresponding to a node available in **vimu**.

## vimu-pocketbase

GitHub: <a href="https://github.com/Flomp/vimu-pocketbase">vimu-pocketbase</a>

vimu-pocketbase is a slightly modified version of the <a href="https://github.com/pocketbase/pocketbase">pocketbase</a> framework. We make use of some of the hooks that pocketbase provides for example to send emails to our users. Otherwise, it behaves exactly as described in their documentation. vimu-pocketbase handles all persistent data that **vimu** creates. This includes files, scores, users, and much more. Furthermore, it provides a real-time database that is used for **vimu's** collaboration features.

## redis

This component is optional. To speed up computations vimu-engine can cache results in a redis memory cache database. vimu-enigne can connect to any redis installation, either self-hosted or in the cloud.