export const createMovie = `
INSERT INTO 
movies (title,genre_id,numberInStock,dailyRentalRate)
VALUES($1,$2,$3,$4) RETURNING *
`;

export const getMovie = `
SELECT *,genres.name AS genre FROM movies m
LEFT JOIN genres USING(genre_id)
WHERE m.movie_id = $1;
`;

export const updateMovie = `
UPDATE movies 
SET %I = %L
WHERE movie_id = %L 
RETURNING *
`;

export const deleteMovie = `
DELETE FROM movies 
WHERE movie_id = $1
RETURNING *
`;

export const updateMovieNumberInStock = `
UPDATE movies 
SET numberinstock = numberinstock + %L
WHERE movie_id = %L 
`;