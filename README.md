# Backend for the IBC job portal

This repository contains the code for the backend server for the IBC job portal prototype. It is developed in line with the requirements of the course Digitale Wirtschaft for the MMT masters program at LMU.
Frontend can be found [here](https://github.com/r-wittmann/ibc-portal-frontend)

# Prerequisites

Before you can start, please make sure you have Node.js and npm installed in their latest versions (developed with versions Node: 8.6.0, npm: 5.5.1)
A tutorial for the installation with the command line can be found here for [macOS](http://blog.teamtreehouse.com/install-node-js-npm-mac) and [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
or with the installer [here](https://nodejs.org/en/).

As database we decided to use [mySQL](https://www.mysql.com/) because the backend may be deployed on a Strato web server at some point, which can only run a mySQL database.
For database setup and migration we use [knex.js](http://knexjs.org/), an open source object relational mapper.
You need to have a local instance of mySQL running and a database with the name ibc_database.

# Getting Started

As we just need a REST API with a little logic behind it, we decided to use [NodeJS](https://nodejs.org) with an [Express web server](https://expressjs.com/).

Make sure to add a ```knexfile.js``` to the project (on root level) with the following contents:

    module.exports = {
        client: 'mysql',
        connection: {
            host : process.env.PORT ? {remoteDatabaseUrl} : 'localhost',
            port: process.env.PORT ? {remoteDatabasePort} : undefined,
            database: process.env.PORT ? {remoteDatabaseName} : 'ibc_database',
            user: process.env.PORT ? {remoteDatabaseUser} : {username},
            password: process.env.PORT ? {remoteDatabasePassword} : {password}
        },
        pool: {
            min: 1,
            max: 4,
        }
    };

replace ```username``` and ```password``` with the values you assigned to your database and the remote database information with the ones from your deployed version.
You don't need to have the remote data, if you only run the backend on your local machine.
The pool is set to a max of 4 because our deployed test database has a connection limit. This can be increased, if your hoster allows it.

Tables and columns will be created by knex migrations which are started automatically once you start the backend.

    $> git clone https://github.com/r-wittmann/ibc-backend.git
    $> cd ibc-backend
    $> npm install
    $> npm run dev

This runs the knex migrations, seeds the database with test data and starts a web server on localhost:9090 which restarts on every code change in the project.

# Development

For development a text editor (e.g. [Sublime](https://www.sublimetext.com/)) is sufficient. A web IDE is not necessary but suggested (e.g. [Webstorm](https://www.jetbrains.com/webstorm/)).
The root file of the application is the ```index.js``` in the root folder. It defines all the high level dependencies and installs the middleware.

The routing can be found in ```/app/index.js``` which includes all files that define routes for the API (found in the ```routes``` folder).

The models folder in the app directory contains the data structure of the objects we use in this application.
In the orm folder you can find the object relational mappings from the Javascript code to mySQL statements using knex.js.

# Postman

We use [Postman](https://www.getpostman.com/) to send requests to the backend to test its functionality. You need to install the Postman application and import the ```.json``` file
in the ```postman``` directory. The Postman Collection contains all functionalities that are possible on the backend without
frontend interaction.

# Deployment

As the legal situation is not clear yet, we decided to host backend and database on a trial account at [pivotal webservices](http://run.pivotal.io/) using [cloud foundry](https://www.cloudfoundry.org/).

Before you can deploy the application to the cloud, you need to install the cloud foundry command line interface ([How To](http://docs.cloudfoundry.org/cf-cli/install-go-cli.html))
After you are able to run ```cf``` commands in your terminal, you will be able to deploy the application using

    $> npm run deploy

This triggers an upload of the backend code to pivotal webservices where it is installed in a node environment.
It is accessible at https://ibc-backend.cfapps.io
At the moment this command pushes the app to a trial version belonging to Rainer Wittmann. This should be changed after the project is over.
For account information you can contact r-wittmann@outlook.de.

&copy; 2017 - 2018 by Lisa Nierhaus, Katrin Hagner, Abdelrahman Youssef and Rainer Wittmann. All rights reserved.
