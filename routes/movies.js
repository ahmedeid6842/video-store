const { Movie, validateMovie } = require('../models/movies');
const { Genre } = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();



route.get('/', async (req, res) => {
    const movie = await Movie.find().sort('name');
    res.send(movie);
});
route.get('/:title', async (req, res) => {
    const movie = await Movie.find({ title: req.params.title });
    if (!movie) return res.status(404).send('no film with that title');
    res.send(movie);
});
route.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send(error.details[0].message);

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});
route.put('/:title', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findOneAndUpdate({ title: req.params.title }, {
        $set: {
            'title': req.body.title,
            'genre': {
                _id: genre._id,
                name: genre.name
            },
            'numberInStock': req.body.numberInStock,
            'dailyRentalRate': req.body.dailyRentalRate
        }
    });
    if (!movie) return res.status(404).send('no film with that title');

    res.send(movie);
});
route.delete('/:title', async (req, res) => {
    const movie = await Movie.findOneAndDelete({ title: req.params.title });
    if (!movie) return res.status(404).send('no film with that title');
    res.send(movie);
});

module.exports = route;