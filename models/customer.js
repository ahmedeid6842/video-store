const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    isGold: {
        type: Boolean, default: false
    },
    phone: {
        type: Number,
        required: true,
        min: 5,
        maxlength: 50
    }
})
const Customer = mongoose.model('customer', schema);

function validate(customer) {
    const schema = {
        isGold: joi.boolean(),
        name: joi.string().min(5).max(255).required(),
        phone: joi.number().required()
    }
    return joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validate;
