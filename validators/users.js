const joi = require('joi');

const createUserSchema = (user) => {
    const schema = joi.object({
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

const loginUserSchema = (user) => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

module.exports = {
    createUserSchema,
    loginUserSchema
}