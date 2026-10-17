
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

// Authentication routes
router.route('/register')
    .post(ctrlAuth.register);

router.route('/login')
    .post(ctrlAuth.login);

// Trip routes
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(auth, ctrlTrips.tripsAddTrip);

router.route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(auth, ctrlTrips.tripsUpdateTrip);

module.exports = router;
