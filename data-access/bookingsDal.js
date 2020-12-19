const Booking = require('../database/models/Bookings');
const cache = require('../services/cache');
const logger = require("../services/logger");
const customersDal = require('./customersDal');
const roomDal = require('./roomsDal');
const Room = require('../database/models/Rooms');
const EXPIRATION_TIME = 900;
const moment = require('moment');


let keyBookingsAll = "bookings_all";

//todo make sure initial deposit does not exceed room cost.


//weird bug, couldn' export from roomsDal. Really hacky fix.
async function checkIfRoomAvailableOnDateRange(roomId, startDate, endDate) {

    let startDateBegin = moment(startDate);
    let endDateBegin = moment(endDate);

    let bookings = await getAllBookingsForRoom(roomId);

    let room = await Room.findById(roomId);

    if (!room) {
        return false;
    }

    for(let i = 0; i < bookings.length; i++) {
        let bookingsArrivalMoment = moment(bookings[i].arrival);
        let bookingsDepartureMoment = moment(bookings[i].checkout);

        //if start date in query is in middle of a booking, then room not available
        if(startDateBegin.isSameOrAfter(bookingsArrivalMoment) && startDateBegin.isSameOrBefore(bookingsDepartureMoment)) {
            return false;
        }

        //if end date in query in middle of a booking, then room not avaialble.
        if(endDateBegin.isSameOrAfter(bookingsArrivalMoment) && endDateBegin.isSameOrBefore(bookingsDepartureMoment)) {
            return false;
        }

    }

    // if passed through previous loop then no conflicts.
    return true;

}


async function createBooking(data) {

    data.paymentIsComplete = false; //too little time to set up data sanitizing middleware.

    if (!data.initialDeposit) {
        throw Error("No initial deposit specified");
    }

    let customer = await customersDal.getCustomerById(data.customerId);

    if (!customer) {
        throw Error("No such customer");
    }

    let room = await Room.findById(data.roomId);

    if (!room) {
        throw Error("No such room");
    }

    let roomIsAvailable = await checkIfRoomAvailableOnDateRange(data.roomId, data.arrival, data.checkout )

    if (!roomIsAvailable) {
        throw Error("Room not available on date range.");
    }
    if (room.price <= data.initialDeposit) {
        data.initialDeposit = room.price;
        data.paymentIsComplete = true;
    }

    data.payments = [{
        amount: data.initialDeposit,
    }]

    let res = await Booking.create(data);
    cache.setCacheWithExpiration("booking" + res._id, res, EXPIRATION_TIME);

    res.message = "Paid extra. Return change";
    //todo do more granular cache eviction
    cache.myCache.flushAll();
    return res;
}


async function doCheckOut(data) {
    let booking = await Booking.findById(data.id);

}


async function getAllBookingsForRoom(roomId) {
    let data = await Booking.find({roomId: roomId});
    return data;
}

async function getBookingById(id) {
    let key = "booking" + id;
    let response = cache.getCachedData(key);

    if (response.status) {
        return response.data;
    } else {
        logger.debug("Cache miss");
        let result = await Booking.findById(id);
        if (result === undefined || result === null) return {};
        cache.setCacheWithExpiration(key, result, EXPIRATION_TIME);
        return result;
    }
}

async function getAllBookings() {
    let key = keyBookingsAll;
    let response = cache.getCachedData(key);

    if (response.status) {
        return response.data;
    } else {
        logger.debug("Cache miss");
        let data = await Booking.find({});
        cache.setCacheWithExpiration(key, data, EXPIRATION_TIME);
        return data;
    }

}

module.exports = {createBooking, getAllBookings, getBookingById, getAllBookingsForRoom};