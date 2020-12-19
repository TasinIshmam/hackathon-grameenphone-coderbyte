let app = require('../app');

let mongoose = require('../database/mongoose');
const { ObjectID } = require('mongodb');

const Bookings = require('../database/models/Bookings');
const Customers = require('../database/models/Customers');
const Rooms = require('../database/models/Rooms');


let roomsData = [
    {   _id:  mongoose.Types.ObjectId(),
        roomNumber: "A1",
        price: 100,
        isLocked: false,
        maxPersons: 2,
        roomType: "Normal"
    },

    {   _id:  mongoose.Types.ObjectId(),
        roomNumber: "A2",
        price: 100,
        isLocked: false,
        maxPersons: 2,
        roomType: "Normal"
    },

    {   _id:  mongoose.Types.ObjectId(),
        roomNumber: "A3",
        price: 100,
        isLocked: false,
        maxPersons: 2,
        roomType: "Normal"
    },

    {    _id:  mongoose.Types.ObjectId(),
        roomNumber: "B1",
        price: 200,
        isLocked: false,
        maxPersons: 3,
        roomType: "Premium"
    },

    { _id:  mongoose.Types.ObjectId(),
        roomNumber: "B2",
        price: 200,
        isLocked: false,
        maxPersons: 3,
        roomType: "Premium"
    },

    { _id:  mongoose.Types.ObjectId(),
        roomNumber: "B3",
        price: 200,
        isLocked: false,
        maxPersons: 3,
        roomType: "Premium"
    }
]

let customersData = [
    {_id:  mongoose.Types.ObjectId(),
        firstName: "name1",
        lastName: "last1",
        email: "first@gmail.com",
        phone: "043534534"
    },

    {_id:  mongoose.Types.ObjectId(),
        firstName: "name2",
        lastName: "last2",
        email: "second@gmail.com",
        phone: "043534534"
    },

    {_id:  mongoose.Types.ObjectId(),
        firstName: "name3",
        lastName: "last3",
        email: "third@gmail.com",
        phone: "043534534"
    }
]


let bookingsData = [
    {
        numberOfPeople: 1,
        bookType: "Generic",
        _id: mongoose.Types.ObjectId(),
        arrival: "2020-01-01T00:00:00.000Z",
        checkout: "2020-01-03T00:00:00.000Z",
        roomId:  roomsData[0]._id,
        customerId: customersData[0]._id,
        payments: [ {
            amount: 50
        } ]
    },

    {
        numberOfPeople: 1,
        bookType: "Generic",
        _id: mongoose.Types.ObjectId(),
        arrival: "2020-01-05T00:00:00.000Z",
        checkout: "2020-01-08T00:00:00.000Z",
        roomId:  roomsData[1]._id,
        customerId: customersData[1]._id,
        payments: [ {
            amount: 50
        } ]
    },

]

async function populateRoomsCollection() {
    const res = await Rooms.insertMany(roomsData, {upsert: true, setDefaultOnInsert: true});

    return res;
}


async function populateBookings() {
    const res = await Bookings.insertMany(bookingsData, {upsert: true, setDefaultOnInsert: true});

    return res;
}


async function populateCustomers() {
    const res = await Customers.insertMany(customersData, {upsert: true, setDefaultOnInsert: true});

    return res;
}

async function call_db_interface() {

    try {
        const res = await populateRoomsCollection();
        console.log(res);

        const customers = await populateCustomers();
        console.log(customers);

        const bookings = await populateBookings();
        console.log(bookings);

        mongoose.disconnect().then( () => {
            process.exit(0);
        })
    } catch (e) {
        console.log(e);
        mongoose.disconnect().then( () => {
            process.exit(0);
        })
    }
}

call_db_interface();