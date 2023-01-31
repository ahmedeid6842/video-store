const pg_format = require("pg-format")

const pool = require("../database/connect");
const { getCustomer } = require("../database/queries/customer");
const { getRentals, getRental, addRental, updateRentalFee } = require("../database/queries/rental");
const { getMovie, updateMovie } = require("../database/queries/movie");
const { rentalPrice } = require("../utils/rentalPrice");


module.exports.getRentals = async (req, res) => {
    const rentals = await pool.query(getRentals);
    res.send(rentals);
}

module.exports.getRental = async (req, res) => {
    const rental = await pool.query(getRental, [req.params.customerId, req.params.movieId])
    if (!rental.rows.length) return res.status(404).send("no rental found");
    return res.send(rental.rows[0]);
}

module.exports.addRental = async (req, res) => {
    const { movie_id, customer_id } = req.body;
    const customer = await pool.query(pg_format(getCustomer, 'customer_id', customer_id));
    const movie = await pool.query(getMovie, [movie_id]);

    if (!customer.rows.length || !movie.rows.length) {
        return res.status(400).send("check movie or customer id");
    };

    await pool.query(pg_format(updateMovie, 'numberInStock', movie.rows[0].numberinstock - 1));
    const rental = await pool.query(addRental, [movie_id, customer_id])
    return res.send(rental.rows[0]);
}

module.exports.backRental = async (req, res) => {
    const { movie_id, customer_id } = req.params;

    let rental = await pool.query(getRental, [req.params.customerId, req.params.movieId])
    if (!rental.rows.length) return res.status(404).send("no rental found");

    const rentalFee = rentalPrice(rental.rows[0].dateOut, rental.rows[0].dailyrentalrate);
    rental = await pool.query(updateRentalFee, [rentalFee, Date.now, customer_id, movie_id]);
    return res.send({
        rentalFee,
        dateOut: rental.rows[0].dateOut,
        dailyRentalRate: rental.rows[0].dailyrentalrate
    })
}
