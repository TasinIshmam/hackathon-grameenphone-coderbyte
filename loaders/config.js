
//add configuration files
//initialize environment variables
//try to use the export from this file instead of touching process.env directly.
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGODB_URI = process.env.MONGODB_URI_LOCAL;  //in case of dev, connect to local URI.
    
    process.env.NODE_ENV = 'development';
} else {
    process.env.MONGODB_URI = process.env.MONGODB_URI_ATLAS;  //in case of dev, connect to local URI.
    process.env.NODE_ENV = 'production';
}


module.exports = {
    mongodbURI : process.env.MONGODB_URI,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL || "debug",
};




