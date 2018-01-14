# Backend for the IBC job portal

This repository contains the code for the backend server for the IBC job portal prototype. It is developed in line with the requirements of the course Digitale Wirtschaft for the MMT masters program at LMU.
Frontend can be found [here](https://github.com/r-wittmann/ibc-portal-frontend)

# Getting Starded

As we just need a REST API with a little logic behind it, we decided to use NodeJS with an Express web server.

As database we decided to use mySQL because the backend may be deployed on a Strato web server at some point, which can only run a mySQL database.
For database setup and migration we use knex.js, an open source object relational mapper.
You need to have a local instance of mySQL running and a database with the name ibc_backend.

Additionally you need to add a knexfile.js to the project (on root level) with the following contents:

    module.exports = {
        client: 'mysql',
        connection: {
            host : process.env.PORT ? 'us-cdbr-iron-east-05.cleardb.net' : 'localhost',
            port: process.env.PORT ? '3306' : undefined,
            database: process.env.PORT ? 'ad_da74d66b1833641' : 'ibc_database',
            user: process.env.PORT ? 'b2584502a454e5' : {username},
            password: process.env.PORT ? '947d6097' : {password}
        },
        pool: {
            min: 1,
            max: 4,
        }
    };

replace username and password with the values you assigned to your database.

Tables and columns will be created by knex migrations which are started automatically once you start the backend.

    $> git clone https://github.com/r-wittmann/ibc-backend.git
    $> cd ibc-backend
    $> npm install
    $> npm run dev

This starts a web server on localhost:9090 which restarts on every code change in the project.

# Postman

We use Postman to send requests to the backend to test its functionality. You need to install the Postman application and import the .json file
in the postman directory. The Postman Collection contains all functionalities that are possible on the backend without
frontend interaction.

# Deployment

As the legal situation is not clear yet, we decided to host backend and database on a trial account at [pivotal webservices](http://run.pivotal.io/) using [cloud foundry](https://www.cloudfoundry.org/).

Before you can deploy the application to the cloud, you need to install the cloud foundry command line interface ([How To](http://docs.cloudfoundry.org/cf-cli/install-go-cli.html))
After you are able to run cf commands in your terminal, you will be able to deploy the application using

    $> npm run deploy

This triggers an upload of the backend code to pivotal webservices where it is installed in a node environment.
It is accessible at https://ibc-backend.cfapps.io

&copy; 2017 by Lisa Nierhaus, Katrin Hagner, Abdelrahman Youssef and Rainer Wittmann. All rights reserved.
