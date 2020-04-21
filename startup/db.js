const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
   
  mongoose.connect('mongodb://localhost/vidly')
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err) => console.log(err.message));
}