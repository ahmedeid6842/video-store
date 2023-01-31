const joi = require('joi');


const createCustomerSchema = (customer) => {
    const schema = joi.object({
        isGold: joi.boolean(),
        name: joi.string().min(5).max(255).required(),
        phone: joi.number().required()
    })
    return schema.validate(customer)
}

const updateCusomterSchema = (customer) => {
    const schema = joi.object({
        isGold: joi.boolean(),
        name: joi.string().min(5).max(255),
        phone: joi.number()
    })
    return schema.validate(customer);
}


module.exports = {
    createCustomerSchema,
    updateCusomterSchema
}
