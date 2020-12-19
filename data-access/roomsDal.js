const Room = require('../database/models/Rooms');
const bookingsDal = require('./bookingsDal');
const cache = require('../services/cache');
const moment = require('moment');
const logger = require("../services/logger");

const EXPIRATION_TIME = 900;


/**
 * Get all rooms in the hotel
 */
 async function getAllRooms() {
    let key = "rooms_all";
    let response = cache.getCachedData(key);

    if (response.status) {
        return response.data; 
    } else {
        console.log("Cache miss");
        let allRooms = await Room.find({});
        cache.setCacheWithExpiration(key, allRooms, EXPIRATION_TIME);
        return allRooms;
    }
}


async function getRoomById(id) {
    let key = "room" + id;
    let response = cache.getCachedData(key);

    if (response.status) {
        return response.data;
    } else {
        logger.debug("Cache miss");
        let result = await Room.findById(id);
        if (result === undefined || result === null) return {};
        cache.setCacheWithExpiration(key, result, EXPIRATION_TIME);
        return result;
    }
}

//todo finish
async function checkIfRoomAvailableOnDateRange(roomId, startDate, endDate) {

    let startDateBegin = moment(startDate).format('YYYY-MM-DD').startOf('day');
    let endDateBegin = moment(endDate).format('YYYY-MM-DD').startOf('day');

    let bookings = await bookingsDal.getAllBookingsForRoom(roomId);

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

module.exports = {getAllRooms, getRoomById, checkIfRoomAvailableOnDateRange}

