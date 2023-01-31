const joi = require('joi');

const createRentalSchema = {
    customerId: joi.objectId().required(),
    movieId: joi.objectId().required()
};

module.exports = {
    createRentalSchema
}