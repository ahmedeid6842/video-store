const pool = require("../database/connect");
const pg_format = require("pg-format");
const { createMovie, getMovie, updateMovie, deleteMovie } = require("../database/queries/movie");
const { getGenre } = require("../database/queries/genres");
const { createMovieSchema, updateMovieSchema } = require("../validators/movies")

module.exports.getMovie = async (req, res) => {
    const movie = await pool.query(getMovie, [req.params.id]);
    if (!movie.rows.length) return res.status(404).send('no film with that title');
    res.send(movie.rows[0]);
}

module.exports.createMovie = async (req, res) => {
    const { title, genreId, numberInStock, dailyRentalRate } = req.body;
    const { error } = createMovieSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await pool.query(pg_format(getGenre, "genre_id", genreId))
    if (!genre.rows.length) return res.status(404).send("no genre found")

    const movie = await pool.query(createMovie, [title, genreId, numberInStock, dailyRentalRate]);
    res.send(movie.rows[0]);
}

module.exports.updateMovie = async (req, res) => {
    const { error } = updateMovieSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = await pool.query(pg_format(updateMovie, req.body(Object.keys(req.body)[0]), req.body(Object.keys(req.body)[0]), req.params.id))
    if (!movie.rows.length) return res.status(404).send('no film with that title');
    res.send(movie.rows[0]);

}

module.exports.deleteMovie = async (req, res) => {
    const movie = await pool.query(deleteMovie, req.params.id);
    if (!movie.rows.length) return res.status(404).send('no film with that title');
    res.send(movie.rows[0]);
}

