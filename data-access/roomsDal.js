const Room = require('../database/models/Rooms');
const cache = require('../services/cache');
const moment = require('moment');

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

async function getAvailableRoomsOnDate(startDate, endDate) {

    let startDateBegin = date.clone().startOf('day');
    let endDateEnd = date.clone().endOf('day');

}

module.exports = {getAllRooms}

