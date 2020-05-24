Massive users creation by using Firebase admin from csv file (Platzi master final project)
===

Resume
---

This is the code related to
* Upload csv from local device
* Read a csv file
* Convert every line of csv file to a JSON object
* Pass the info to firebase to create users in a massive way


Installation
---

1. Clone the repo.
2. Install with:
    `npm install`

Deploy
---

Deployed code in heroku (https://guarded-dawn-35517.herokuapp.com/). 
Tutorial how to deploy in this FAQ website: https://devcenter.heroku.com/articles/deploying-nodejs


Structure
---

### Main file:

* Location: index.js

### Libraries included: 

    * Node version: 12.x
    * NPM version: 6.x.x 
    * Working with local env variables: dotenv
    * Middleware for handling multipart/form-data (CSV in this case): multer
    * CSV to JSON convertion: csvtojson
    * Template for page to upload files: ejs (It will be updated to another framework when front end is ready)
    * Firebase massive users management: firebase-admin

Environment variables
---

1. Get the data for creation of credentials environment variables in firebase platform > your project > service accounts > Generate new private key.
2. A json file will be downloaded with the variables values.
3. Create the environment variables in your deploy platform. For local tests, library dotenv is used.

IMPORTANT: local code has been run by using Heroku CLI, if you try to run by using the normal way as "node index.js" probably env variables don´t be recognized.
