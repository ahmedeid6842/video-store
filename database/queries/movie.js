const createMovie = `
INSERT INTO 
movies (title,genre_id,numberInStock,dailyRentalRate)
VALUES($1,$2,$3,$4) RETURNING *
`

const getMovie = `
SELECT *,genres.name AS genre FROM movies m
LEFT JOIN genres USING(genre_id)
WHERE m.movie_id = $1;
`
const updateMovie = `
UPDATE movies 
SET %I = %L
WHERE movie_id = %L 
RETURNING *
`

const deleteMovie = `
DELETE FROM movies 
WHERE movie_id = $1
RETURNING *
`


module.exports = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}