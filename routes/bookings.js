let express = require('express');
let router = express.Router();
const logger = require("../services/logger");

const bookingsDal = require('../data-access/bookingsDal');



// must have initialdeposit field which is added as first payment.
router.post('/', async (req, res, next) => {

    try {
        let booking = await bookingsDal.createBooking(req.body);
        res.status(200).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


router.get('/', async (req, res, next) => {

    try {
        let booking = await bookingsDal.getAllBookings();
        res.status(200).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        let room = await bookingsDal.getBookingById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})



module.exports = router;