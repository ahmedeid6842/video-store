const express = require('express');

const users = require('../routes/users');
const genres = require('../routes/genre');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const customers = require('../routes/customer');

const isAuth = require("../middleware/auth");
const error = require('../middleware/error');


module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/customers', customers);
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  app.use('/api/rentals', isAuth, rentals);
  app.use(error);

}