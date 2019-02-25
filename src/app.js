const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./middlewares/passport')(passport);

// routes: http://localhost:3001/v1/....
app.use('/v1', require('./routes'));

//error handling
//catch 404
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

//catch errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

module.exports = app;
