require('dotenv').config()
const express = require('express');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT;
const mongoConnectionString = process.env.MONGODB_URI
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to CRUD application."});
});

// Configuring the database
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(mongoConnectionString, {
useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

// Require Users routes
const bookRoutes = require('./src/routes/book.routes')
// using as middleware
app.use(process.env.URL, bookRoutes)

// listen for requests
app.listen(port, () => console.log(`Server has started at port ${port}`));