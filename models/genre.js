const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        
    }
})
const Genre = mongoose.model('genres', genreSchema);

function validate(genres) {
    const schema = {
        name: joi.string().min(3).required()
    }
    return joi.validate(genres, schema);
}
exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validate;