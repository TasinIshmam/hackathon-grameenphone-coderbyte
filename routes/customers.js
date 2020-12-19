var express = require('express');
var router = express.Router();
const logger = require("../services/logger");

const customerDal = require('../data-access/customersDal');




router.post('/customers', async (req, res, next) => {

    try {
        let customer = await customerDal.createCustomer(req.body);
        res.status(200).send(customer);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});

router.get('/customers', async (req, res, next) => {

    try {
        let customer = await customerDal.getAllCustomers();
        res.status(200).send(customer);
    } catch(e) {
        logger.error(e);
        next(e);
    }
});


router.get('/customers/:id', async (req, res, next) => {
    try {
        let room = await customerDal.getCustomerById(req.params.id);
        return res.status(200).send(room);
    } catch (e) {
        console.log(e);
        next(e);
    }
})

module.exports = router;
