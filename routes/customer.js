const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();




route.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    try {
         customer = await customer.save();
        res.send(customer);
    }
    catch (err) {
        res.send(err.message);
    }

});
route.get('/', async (req, res) => {
    const customers = await Customer.find()
        .sort({ name: 1 });
    res.send(customers);
});
route.get('/:name', async (req, res) => {
    const customer = await Customer
        .find({ name: req.params.name })
        .sort({ name: 1 });

    if (!customer) return res.status(404).send('no customer found with that name');

    res.send(customer);
});
route.put('/:name', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findOneAndUpdate({ name: req.params.name },
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true });
    if (!customer) return res.status(404).send('no customer is found with that name');
    res.send(customer);
});

route.delete('/:name', async (req, res) => {
    const customer = await Customer.findOneAndDelete({ name: req.params.name });
    if (!customer) return res.status(404).send('no data found');
    res.send(customer);
});


module.exports = route;
