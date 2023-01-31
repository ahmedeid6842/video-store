const joi = require('joi');

const createMovieSchema = (movie) => {
    schema = joi.object({
        title: joi.string().min(5).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    })
    return schema.validate(movie)
}

const updateMovieSchema = (movie) => {
    schema = joi.object({
        title: joi.string().min(5).max(50),
        genreId: joi.string(),
        numberInStock: joi.number().min(0),
        dailyRentalRate: joi.number().min(0)
    })
    return schema.validate(movie);
}

module.exports = {
    createMovieSchema,
    updateMovieSchema
}

