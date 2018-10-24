# TWEB - github API
Guillaume Hochet - Loïc Schürch

This project aims at showing when github users commits their work by displaying
it in a nicely made webapp.

## Structure
This repository contains two projects which are described here.

### Backend
The backend part is a nodejs http server app who's role is forwarding
github api request to the webapp. It also holds a cache based on mongodb
to store requests and checks for their expiration time.

#### Technologies used
* nodejs, obviously
* express for the http server
* mongoose for the mongodb database interaction
* axios for http requests
* mocha and chai to make some tests but just for self satisfaction

The server makes three endpoints available, one to get user information,
one for repositories information and one for commits information. When
a request is made, the server first checks if there's some data stored
in cache, if yes, it returns it. Otherwise, it makes a github api request,
cleans it to fit its needs, stores it in cache and finally returns it.

### Frontend
The frontend part is a Vue.js web application displaying data received
by the backend. It also displays some random gifs if you ask for it,
using giphy public api.

#### Main technologies used
* vuejs because it's cool
* axios again to make http requests
* bootstrap for base styling, using SCSS preprocessors
* chart.js for charts
* vue-router for webapp navigation

## Installing
1. Clone this repo somewhere on your hard drive
2. Create a .env file in `/backend` based on .env.dist
3. Create a env.js file in `/frontend` based on env.js.dist
4. Run `npm i` in both frontend and backend directories
5. Run `npm run serve` from `/backend` directory to launch server
6. Run `npm run dev` from `/frontend` directory to launch web app
7. Optional, if you want to build web app, run `npm run build` from frontend
directory, this will build it in `/docs` file (used for github pages)

## Check it out
Project is hosted on heroku and github pages,
[frontend can be accessed here](https://sysmoh.github.io/TWEB-project-github)