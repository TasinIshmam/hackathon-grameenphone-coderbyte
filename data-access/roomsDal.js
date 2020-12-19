const Room = require('../database/models/Rooms');
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
        let result = await Room.findOne({"id": id});
        if (result === undefined || result === null) return {};
        cache.setCacheWithExpiration(key, result, EXPIRATION_TIME);
        return result;
    }
}

//todo finish
async function getAvailableRoomsOnDate(startDate, endDate) {

    let startDateBegin = startDate.clone().startOf('day');
    let endDateEnd = endDate.clone().endOf('day');

}

module.exports = {getAllRooms, getRoomById}

