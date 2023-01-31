const getGenre = `SELECT * FROM genres WHERE %I = %L `

const createGenre = `INSERT INTO genres(name) VALUES($1) RETURNING *`

const updateGenre = `
UPDATE genres 
SET name = $1
WHERE genre_id = $2
RETURNING *
`

const deleteGenre = `
DELETE FROM genres 
WHERE genre_id = $1
RETURNING *
`
module.exports = {
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre
}