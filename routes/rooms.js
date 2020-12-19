
var express = require('express');
var router = express.Router();


const Customer = require('../database/models/Customers');
const roomDal = require('../data-access/roomsDal');


//get all rooms
router.get('/rooms', async (req, res, next) => {

    try {
        let allRooms = await roomDal.getAllRooms();
        res.status(200).send(allRooms);
    } catch(e) {
        console.log(e);
        next(e);
    }
});






module.exports = router;
