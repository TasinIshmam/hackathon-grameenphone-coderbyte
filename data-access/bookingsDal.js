const Booking = require('../database/models/Bookings');
const cache = require('../services/cache');
const logger = require("../services/logger");

const EXPIRATION_TIME = 900;

let keyBookingsAll = "bookings_all";

async function createBooking(data) {
    let res = await Booking.create(data);
    cache.setCacheWithExpiration("booking" + res._id, res, EXPIRATION_TIME);
    cache.myCache.del(keyBookingsAll);
    return res;
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

module.exports = {createBooking, getAllBookings, getBookingById};