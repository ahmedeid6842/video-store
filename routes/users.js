const { User, validateUser } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const becrypt = require('bcrypt');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('email already used');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await becrypt.genSalt(10);
    user.password = await becrypt.hash(user.password, salt);

    await user.save();
    try {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    } catch (err) {
        res.send(err.message);
    }


});

module.exports = router;