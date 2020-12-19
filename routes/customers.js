var express = require('express');
var router = express.Router();
const logger = require("../services/logger");

const customerDal = require('../data-access/customersDal');


/**
 * @swagger
 * /customers:
 *  post:
 *    tags:
 *    - customer
 *    summary: Create Customer
 *    description: Create a customer entry
 *    operationId: createCustomer
 *    security:
 *      - apiKey: []
 *    requestBody:
 *      description: Customer object
 *      content:
 *        'application/json':
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              registeredAt:
 *                type: string
 *                format: date-time
 *      required: true
 *    responses:
 *      '201':
 *        description: Returns created customer object
 *      '403':
 *        description: Returns unauthorized error message
 */
router.post('/', async (req, res, next) => {

    try {
        let customer = await customerDal.createCustomer(req.body);
        res.status(200).send(customer);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


/**
 * @swagger
 * /customers:
 *  get:
 *    tags:
 *    - customer
 *    summary: List all customers
 *    description: Returns list of all customers.
 *    operationId: getAllCustomers
 *    security:
 *      - apiKey: []
 *    responses:
 *      '200':
 *        description: Returns list of all customers
 *      '403':
 *        description: Returns unauthorized error message
 */
router.get('/', async (req, res, next) => {

    try {
        let customer = await customerDal.getAllCustomers();
        res.status(200).send(customer);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


/**
 * @swagger
 * /customers/{id}:
 *  get:
 *    tags:
 *    - customer
 *    summary: Returns the customer with id
 *    description: Returns the customer with id
 *    operationId: getCustomerId
 *    security:
 *      - apiKey: []
 *    parameters:
 *    - name: id
 *      in: path
 *      description: ID of the customer to return
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: Returns the customer with id
 *      '403':
 *        description: Returns unauthorized error message
 *      '404':
 *        description: Returns not found error message
 */
router.get('/:id', async (req, res, next) => {
    try {
        let room = await customerDal.getCustomerById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})

module.exports = router;
