CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE customers(
 customer_id SERIAL PRIMARY KEY,
 name VARCHAR(255),
 isGold BOOLEAN DEFAULT FALSE,
 phone VARCHAR(11) NOT NULL
);

CREATE TABLE  genres(
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE movies(
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre_id INT REFERENCES genres(genre_id),
    numberInStock INT DEFAULT 0,
    dailyRentalRate INT NOT NULL
);

CREATE TABLE rentals(
    customer_id INT REFERENCES customers(customer_id) ON DELETE cascade,
    movie_id INT REFERENCES movies(moive_id) ON DELETE cascade,
    dateOut DATE DEFAULT now(), 
    dateReturned DATE ,
    rentalFee INT,
    PRIMARY KEY (customer_id,moive_id)
);

