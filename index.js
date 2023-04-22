//Import the dependencies 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/mongoose')

// Create a new Express app
const app = express();

// Use body-parser middleware to parse request bodies as JSON
app.use(bodyParser.json());

// router > all the links would be routed to the router index file
app.use('/',require('./routers/index'))


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
