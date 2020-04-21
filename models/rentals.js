const mongoose = require('mongoose');
const joi = require('joi');
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFree: {
        type: Number,
        min: 0
    }
});
const Rental=mongoose.model('rentals',rentalSchema);
function validateRental(rental) {
    const schema = {
        customerId: joi.objectId().required(),
        movieId: joi.objectId().required()
    };
    return joi.validate(rental, schema);
}

exports.Rental=Rental;
exports.validateRental=validateRental;