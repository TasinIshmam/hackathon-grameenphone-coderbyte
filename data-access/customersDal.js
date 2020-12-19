const Customer = require('../database/models/Customers');
const cache = require('../services/cache');
const moment = require('moment');
const logger = require("../services/logger");

const EXPIRATION_TIME = 900;


async function createCustomer(data) {
        let res = await Customer.create(data);
        cache.setCacheWithExpiration("customer" + res._id, res, EXPIRATION_TIME);
        return res;
}

async function getAllCustomers() {
        let key = "customers_all";
        let response = cache.getCachedData(key);

        if (response.status) {
                return response.data;
        } else {
                logger.debug("Cache miss");
                let customers = await Customer.find({});
                cache.setCacheWithExpiration(key, customers, EXPIRATION_TIME);
                return customers;
        }
}

module.exports = {createCustomer, getAllCustomers}