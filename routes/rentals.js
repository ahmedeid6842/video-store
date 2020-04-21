const { Rental, validateRental } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const router = express.Router();

Fawn.init(mongoose);



router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('customer.name');
    res.send(rental);
});
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(id);
    if (!rental) return res.status(404).send('no rental with that customer name found');
    res.send(rental);
});
router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send('invalid Rental');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('no customer with that id');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('no movie with that id ');

    if (movie.numberInStock === 0) return res.status(400).send('movie is finished');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
        res.send(rental);
    } catch (ex) {
        res.status(500).send('connection failed server');
    }
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    // res.send(rental);


});

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send('no rental with that id');
    res.send(rental);
});

module.exports = router;