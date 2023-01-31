const joi = require('joi');

const createGenreSchema = (genre) => {
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
    return schema.validate(genre);
}

const updateGenreSchema = (genre) => {
    const schema = joi.object({
        name: joi.string().min(3)
    })
    return schema.validate(genre);
}

module.exports = {
    createGenreSchema,
    updateGenreSchema
}

