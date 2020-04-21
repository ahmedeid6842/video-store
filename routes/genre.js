const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware=require('../middleware/async');

const app = express.Router();

app.get('/', asyncMiddleware(async (req, res, next) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (ex) {
        next(ex);
    }
}));

app.get('/:id', async (req, res) => {
    const result = await Genre.find({ id: req.params.id });
    if (!result) return res.status(404).send("data not found");
    res.send(result);
});

app.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const num = await Genre.find().count();
    let newgenre = new Genre({
        id: num + 1,
        name: req.body.name
    });

    newgenre = await newgenre.save()
    res.send(newgenre);
})

app.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name
        }, { new: true })
    if (!genre) return res.status(404).send('data not found');

    res.send(genre);
})
app.delete('/:id', [auth, admin], async (req, res) => {
    const result = await Genre.findByIdAndDelete(req.params.id);
    if (!result) res.status(400).send('data not found');
    res.send(result);
})

module.exports = app;






