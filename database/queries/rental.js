const getRentals = `
SELECT 
    r.*,
    m.title as movie_title,
    m.numberInStock as movie_NumberInStock,
    m.dailyRentalRate,
    c.name as customer_name,
    c.isgold,
    c.phone as customer_phone
    FROM rentals r 
JOIN  movies m USING(movie_id)
JOIN customers c USING(customer_id);
`
const getRental = `
SELECT 
    r.*,
    m.title as movie_title,
    m.numberInStock as movie_NumberInStock,
    m.dailyRentalRate,
    c.name as customer_name,
    c.isgold,
    c.phone as customer_phone
    FROM rentals r 
JOIN  movies m USING(movie_id)
JOIN customers c USING(customer_id);
WHERE c.customer_id = $1 AND m.movie_id = $2
`
const addRental = `
INSERT INTO 
rentals (movie_id,customer_id) 
values($1,$2)
RETURNING *
`
const updateRentalFee = `
UPDATE rentals 
SET 
    rentalFee = $1 
 AND
    dateReturned = $2 ,
WHERE
    customer_id = $3 
 AND
    movie_id = $4 
RETUNING * 
`
module.exports = {
    getRentals,
    getRental,
    addRental,
    updateRentalFee
}

