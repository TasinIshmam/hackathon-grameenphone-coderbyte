const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// create booking Schema and model
const RoomSchema = new Schema({

    roomNumber: {
        type: String,
        required: [true, 'Room Number field is required']
    },

    price: {
        type: Number,
        required: [true, "Price is required"]
    },

    isLocked: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
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

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;