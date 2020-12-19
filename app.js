
//initialize env variables, database and loaders.
const config = require('./loaders/config');

// load database
let mongoose = require('./database/mongoose');

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
const helmet = require('helmet');

//local imports

let limiter = require('./middleware/rate-limiter-middleware');
const logger = require('./services/logger');

let swaggerJsdoc = require("swagger-jsdoc");
let swaggerUi = require("swagger-ui-express");


//express
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('tiny', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())


const apiVersion = "v1";

//routers
let indexRouter = require('./routes/index');
let roomsRouter = require('./routes/rooms');
let customersRouter = require('./routes/customers');
let bookingsRouter = require('./routes/bookings');
let paymentsRouter = require('./routes/payments');

app.use('/', indexRouter);
app.use(`/api/${apiVersion}`, limiter.rateLimiterMiddlewareInMemory, roomsRouter);
app.use(`/api/${apiVersion}`, limiter.rateLimiterMiddlewareInMemory, customersRouter);
app.use(`/api/${apiVersion}`, limiter.rateLimiterMiddlewareInMemory, bookingsRouter);
// app.use(`/api/${apiVersion}`, limiter.rateLimiterMiddlewareInMemory, paymentsRouter);

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking API",
      version: "0.1.0",
      description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Tasin Ishmam",
        url: "https://tasinishmam.com",
        email: "tasinishmam@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/rooms",
      },
    ],
  },
  apis: ["./routes/rooms.js"],
};



const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


process.on('SIGINT', async function() {
  //todo shift from console.error to something more...reasonable
  console.error('SIGINT called');
  await mongoose.disconnect();
  console.error('Mongoose connection terminated');
  process.exit(0);
});

process.on('SIGTERM', async function() {
  console.error('SIGTERM called');
  await mongoose.disconnect();
  console.error('Mongoose connection terminated');
  process.exit(0);
});


module.exports = app;
