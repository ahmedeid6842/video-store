import pool from "../database/connect";
import pg_format from "pg-format";
import { getGenre } from "../database/queries/genre";
import { getMovie } from "../database/queries/movie";
import { getCustomer } from "../database/queries/customer";

export const isValidGenreId = async (genreId: string) => {
  const genre = await pool.query(pg_format(getGenre, "genre_id", genreId));
  return genre.rows.length ? true : false;
};

export const isValidMovieId = async (movieId: string) => {
  const movie = await pool.query(getMovie, [movieId]);
  return movie.rows.length ? true : false;
};

export const isValidCustomerId = async (customerId: string) => {
  const customer = await pool.query(
    pg_format(getCustomer, "customer_id", customerId)
  );
  return customer.rows.length ? true : false;
};
