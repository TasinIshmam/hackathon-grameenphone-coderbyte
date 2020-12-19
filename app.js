
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
let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');
let limiter = require('./middleware/rate-limiter-middleware');
const logger = require('./services/logger');



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
//routers
app.use('/', indexRouter);
app.use('/api', limiter.rateLimiterMiddlewareInMemory, apiRouter);

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
