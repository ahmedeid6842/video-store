export const getGenre = `SELECT * FROM genres WHERE %I = %L `;

export const createGenre = `INSERT INTO genres(name) VALUES($1) RETURNING *`;

export const updateGenre = `
UPDATE genres 
SET name = $1
WHERE genre_id = $2
RETURNING *
`;

export const deleteGenre = `
DELETE FROM genres 
WHERE genre_id = $1
RETURNING *
`;
