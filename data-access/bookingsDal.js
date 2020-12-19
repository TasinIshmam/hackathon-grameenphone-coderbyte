const Booking = require('../database/models/Bookings');
const cache = require('../services/cache');
const logger = require("../services/logger");
const customersDal = require('./customersDal');
const roomDal = require('./roomsDal');
const EXPIRATION_TIME = 900;

let keyBookingsAll = "bookings_all";

//todo make sure initial deposit does not exceed room cost.

async function createBooking(data) {

    data.paymentIsComplete = false; //too little time to set up data sanitizing middleware.

    if (!data.initialDeposit) {
        throw Error("No initial deposit specified");
    }

    let customer = await customersDal.getCustomerById(data.customerId);

    if (!customer) {
        throw Error("No such customer");
    }

    let room = await roomDal.getRoomById(data.roomId);

    if (!room) {
        throw Error("No such room");
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