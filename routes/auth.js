const { User } = require('../models/users');

const mongoose = require('mongoose');
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid user name or password");

    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) return res.status(400).send("invalid user name or password");

    const token = user.generateAuthToken();

    res.send(token);

})

function validate(user) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    }
    return joi.validate(user, schema);
}

module.exports = router;