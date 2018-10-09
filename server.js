// Setup database
const mongoose = require('mongoose');
const dbConfig = require('./config/db');

mongoose.Promise = global.Promise; // use the standard Promise instead of the mongoose one
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

// Setup express app
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// Start
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port', process.env.PORT || 3000);
});
