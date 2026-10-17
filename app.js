require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');

// Connect to MongoDB and register Mongoose models
require('./app_api/models/db');

// Configure Passport authentication
require('./app_api/config/passport');

const app = express();
const PORT = 3000;

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');
const cors = require('cors');

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Allow requests from Angular
app.use('/api', cors({
    origin: 'http://localhost:4200'
}));

// Parse JSON and form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport authentication
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});