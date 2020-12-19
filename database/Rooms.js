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
        type: Boolean,
        default: false
    },

    maxPersons: {
        type: Number,
        required: true
    },

    roomType: {
        type: String,
        default: "Regular"
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;