
var express = require('express');
var router = express.Router();


const Customer = require('../database/models/Customers');
const roomDal = require('../data-access/roomsDal');


//get all rooms

/**
 * @swagger
 * /rooms:
 *  get:
 *    tags:
 *    - room
 *    summary: List all rooms
 *    description: Returns list of all rooms.
 *    operationId: getAllRooms
 *    security:
 *      - apiKey: []
 *    responses:
 *      '200':
 *        description: Returns list of all rooms
 *      '403':
 *        description: Returns unauthorized error message
 */
router.get('/', async (req, res, next) => {

    try {
        let allRooms = await roomDal.getAllRooms();
        res.status(200).send(allRooms);
    } catch(e) {
        console.log(e);
        next(e);
    }
});

//get specific room

/**
 * @swagger
 * /rooms/{id}:
 *  get:
 *    tags:
 *    - room
 *    summary: Returns the room with id
 *    description: Returns the room with id
 *    operationId: getRoomId
 *    security:
 *      - apiKey: []
 *    parameters:
 *    - name: id
 *      in: path
 *      description: ID of the room to return
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: Returns the room with id
 *      '403':
 *        description: Returns unauthorized error message
 *      '404':
 *        description: Returns not found error message
 */
router.get('/:id', async (req, res, next) => {
    try {
        let room = await roomDal.getRoomById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})






module.exports = router;
