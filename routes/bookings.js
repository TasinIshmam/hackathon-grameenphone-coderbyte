let express = require('express');
let router = express.Router();
const logger = require("../services/logger");

const bookingsDal = require('../data-access/bookingsDal');



// must have initialdeposit field which is added as first payment.
// create booking


/**
 * @swagger
 * /bookings:
 *  post:
 *    tags:
 *    - booking
 *    summary: Create Booking
 *    description: Create a booking entry. Must have an initial deposit.
 *    operationId: createBooking
 *    security:
 *      - apiKey: []
 *    requestBody:
 *      description: Booking object
 *      content:
 *        'application/json':
 *          schema:
 *            type: object
 *            properties:
 *              arrival:
 *                type: string
 *              checkout:
 *                type: string
 *                format: date-time
 *              roomId:
 *                type: string
 *              customerId:
 *                type: string
 *              numberOfPeople:
 *                type: string
 *              bookType:
 *                type: string
 *                default: "Generic"
 *              paymentIsComplete:
 *                type: boolean
 *                default: false
 *              initialDeposit:
 *                type: number
 *      required: true
 *    responses:
 *      '201':
 *        description: Returns created booking object
 *      '403':
 *        description: Returns unauthorized error message
 */
// must have initialdeposit field which is added as first payment.
router.post('/', async (req, res, next) => {

    try {
        let booking = await bookingsDal.createBooking(req.body);
        res.status(201).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


//get all bookings

/**
 * @swagger
 * /bookings:
 *  get:
 *    tags:
 *    - booking
 *    summary: List all bookings
 *    description: Returns list of all bookings.
 *    operationId: getAllBookings
 *    security:
 *      - apiKey: []
 *    responses:
 *      '200':
 *        description: Returns list of all bookings
 *      '403':
 *        description: Returns unauthorized error message
 */
router.get('/', async (req, res, next) => {

    try {
        let booking = await bookingsDal.getAllBookings();
        res.status(200).send(booking);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


// get booking by Id

/**
 * @swagger
 * /bookings/{id}:
 *  get:
 *    tags:
 *    - booking
 *    summary: Returns the booking with id
 *    description: Returns the booking with id
 *    operationId: getBookingId
 *    security:
 *      - apiKey: []
 *    parameters:
 *    - name: id
 *      in: path
 *      description: ID of the booking to return
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: Returns the booking with id
 *      '403':
 *        description: Returns unauthorized error message
 *      '404':
 *        description: Returns not found error message
 */
router.get('/:id', async (req, res, next) => {
    try {
        let room = await bookingsDal.getBookingById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})


/**
 * @swagger
 * /bookings/{id}/checkout:
 *  put:
 *    tags:
 *    - booking
 *    summary: Performs Checkout
 *    description: Returns the booking with id
 *    operationId: performCheckout
 *    security:
 *      - apiKey: []
 *    parameters:
 *    - name: id
 *      in: path
 *      description: ID of the room to checkout
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: Returns the setteled booking object
 *      '403':
 *        description: Returns unauthorized error message
 *      '404':
 *        description: Returns not found error message
 */
router.put('/:id/checkout', async (req, res, next) => {

    try {
        let response = await bookingsDal.doCheckOut(req.params.id);
        return res.status(200).send(response);
    } catch (e) {
        console.log(e);
        next(e);
    }

    });



// //update booking
// router.put('/:id', async (req, res, next) => {
//     try {
//         let room = await bookingsDal.getBookingById(req.params.id);
//         return res.status(200).send(room);
//     } catch (e) {
//         console.log(e);
//         next(e);
//     }
// })





module.exports = router;