const pg_format = require("pg-format");
const pool = require("../database/connect");
const { getGenre, createGenre, updateGenre, deleteGenre } = require("../database/queries/genres")
const { createGenreSchema, updateGenreSchema } = require("../validators/genre")

module.exports.createGenre = async (req, res) => {
    const { error } = createGenreSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await pool.query(createGenre, [req.body.name]);

    res.send(genre.rows[0]);

}

module.exports.getGenre = async (req, res) => {
    const genre = await pool.query(pg_format(getGenre, Object.keys(req.query)[0], req.query[Object.keys(req.query)[0]]));
    if (!genre.rows.length) return res.status(404).send("genre not found");
    res.send(genre.rows[0]);
}

module.exports.updateGenre = async (req, res) => {

    const { error } = updateGenreSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await pool.query(updateGenre, [req.body.name, req.params.id]);
    if (!genre.rows.length) return res.status(404).send('data not found');

    res.send(genre.rows[0]);
}

module.exports.deleteGenre = async (req, res) => {
    const result = await pool.query(deleteGenre, [req.params.id]);
    if (!result.rows.length) res.status(400).send('data not found');
    res.send(result.rows[0]);
}


