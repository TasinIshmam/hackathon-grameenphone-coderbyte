let express = require('express');
let router = express.Router();
const logger = require("../services/logger");

const bookingsDal = require('../data-access/bookingsDal');




router.post('/bookings', async (req, res, next) => {

    try {
        let booking = await bookingsDal.createBooking(req.body);
        res.status(200).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


router.get('/bookings', async (req, res, next) => {

    try {
        let booking = await bookingsDal.getAllBookings();
        res.status(200).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});



module.exports = router;