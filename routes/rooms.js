
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

router.get('/rooms/:id', async (req, res, next) => {
    try {
        let room = await roomDal.getRoomById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})






module.exports = router;
