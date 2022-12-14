/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const {
  health,
  purchaseReason,
  brand,
  origin,
  product,
  shop,
  user,
  auth,
  privateRoutes,
} = require('./src/routes');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.URI)
  .then(() => console.log('Database connected 🤙'))
  .catch((err) => console.log(err));

require('./src/auth/auth');

app.use('/', health);
app.use('/api/v1/purchase-reason', purchaseReason);
app.use('/api/v1/brand', brand);
app.use('/api/v1/origin', origin);
app.use('/api/v1/product', product);
app.use('/api/v1/shop', shop);
app.use('/api/v1/user', user);
app.use('/api/v1', auth);
app.use('/api/v1', privateRoutes);

app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  privateRoutes
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
