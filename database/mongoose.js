let mongoose = require('mongoose');
const logger = require('../services/logger');
const config = require('../loaders/config');

//loader class for mongoDB.
//initializes mongodb and exports connection.


mongoose.Promise = global.Promise;
mongoose.connect( config.mongodbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false   //Mongoose no longer automatically creates indices. Do it manually by calling createIndex() in the model files.
}).then(() => logger.info("You are connected to the database"))
    .catch((err) => {
        logger.error(err)
    });


module.exports = mongoose;


/*
* Naming convention for mongoose collections and db: https://intellipaat.com/community/28608/what-are-naming-conventions-for-mongodb#:~:text=The%20name%20should%20be%20a,not%20a%20valid%20collection%20name.
* "Model" in mongoose == Abstraction over "Collection" in the mongodb native code
* */