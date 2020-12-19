const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// create booking Schema and model
const BookingSchema = new Schema({

    arrival: {
        type: Date,
        required: [true, 'Arrival date is required']
    },
    checkout: {
        type: Date,
        required: [true, 'Checkout date is required']
    },

    roomID: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

    numberOfPeople: {
        type: Number,
        default: 1,
    },
    bookType: {
        type: String,
        required: [true, 'Number of nights is required']
    },
    bookTime: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;