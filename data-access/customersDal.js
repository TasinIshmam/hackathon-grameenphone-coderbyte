const Customer = require('../database/models/Customers');
const cache = require('../services/cache');
const logger = require("../services/logger");

const EXPIRATION_TIME = 900;

const keyCustomersAll = "customers_all";

async function createCustomer(data) {
        let res = await Customer.create(data);
        cache.setCacheWithExpiration("customer" + res._id, res, EXPIRATION_TIME);
        cache.myCache.del(keyCustomersAll);
        return res;
}


async function getCustomerById(id) {
        let key = "customers_" + id;
        let response = cache.getCachedData(key);

        if (response.status) {
                return response.data;
        } else {
                logger.debug("Cache miss");
                let result = await Customer.findById(id);

                if (result === undefined || result === null) return {};

                cache.setCacheWithExpiration(key, result, EXPIRATION_TIME);
                return result;
        }
}

async function getAllCustomers() {
        let key = keyCustomersAll
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

module.exports = {createCustomer, getAllCustomers, getCustomerById}