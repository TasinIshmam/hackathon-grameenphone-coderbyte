const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

// create user Schema and model
const CustomerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Name field is required']
    },
    lastName: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number field is required']
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;