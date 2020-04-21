const { genreSchema } = require('./genre');
const mongoose = require('mongoose');
const joi = require('joi');

const Movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        time: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        require: true,
        min: 0,
        max: 255,
    }
}))


function validateMovie(movie) {
    const schema = {
        title: joi.string().min(5).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    }
    return joi.validate(movie, schema);
}
exports.Movie = Movie;
module.exports.validateMovie = validateMovie
