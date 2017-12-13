# Backend for the IBC job portal

This repository contains the code for the backend server for the IBC job portal prototype. It is developed in line with the requirements of the course Digitale Wirtschaft for the MMT masters program at LMU.

# Getting Starded

As we just need a REST API with a little logic behind it, we decided to use NodeJS with an Express web server.

    $> git clone https://github.com/r-wittmann/ibc-backend.git
    $> cd ibc-backend
    $> npm install
    $> npm run dev

This starts a web server on localhost:9090 which restarts on every code change in the project.

As database we decided to use mySQL because the backend will be deployed on a Strato web server, which can only run a mySQL database.
For database setup and migration we use knex.js, an open source object relational mapper.
You need to have a local instance of mySQL running and a database with the name ibc-backend. Tables and columns will be created by knex migrations.

# Deployment

not implemented yet.

&copy; 2017 by Lisa Nierhaus, Katrin Hagner, Abdelrahman Youssef and Rainer Wittmann. All rights reserved.
