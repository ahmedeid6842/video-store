const joi = require('joi');

module.exports = function() {
  joi.objectId = require('joi-objectid')(joi);
}