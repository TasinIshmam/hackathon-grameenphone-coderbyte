
var express = require('express');
var router = express.Router();


const Customer = require('../database/models/Customers');
const Room = require('../database/models/Rooms');


//get all rooms
router.get('/rooms', (req, res, next) => {

    try {
        let allRooms = await Room.find({});
    } catch(e) {
        console.log(e);
        next(e);
    }
});



module.exports = router;
