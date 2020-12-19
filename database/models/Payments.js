const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// create booking Schema and model
const PaymentSchema = new Schema({

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    },

    amount: {
        type: Number,
        required: true
    },

    paymentTime: {
        type: Date,
        default: Date.now
    }
});


const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;