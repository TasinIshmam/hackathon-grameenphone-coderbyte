const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({


    amount: {
        type: Number,
        required: true
    },

    paymentTime: {
        type: Date,
        default: Date.now
    }
});

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

    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'roomId date is required']
    },

    //todo add room name.

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
        required: [true, 'Mention the type of booking'],
        default: "Generic"
    },
    bookTime: {
        type: Date,
        default: Date.now
    },

    paymentIsComplete: {
        type: Boolean,
        default: false
    },

    checkoutFinished: {
        type: Boolean,
        default: false
    },

    payments: [PaymentSchema]
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;