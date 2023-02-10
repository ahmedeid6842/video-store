import pool from "../database/connect";
import pg_format from "pg-format";
import { getGenre } from "../database/queries/genre";
import { getMovie } from "../database/queries/movie";

export const isValidGenreId = async (genreId: number) => {
  const genre = await pool.query(pg_format(getGenre, "genre_id", genreId));
  return genre.rows.length ? true : false;
};

export const isValidMovieId = async (movieId: string) => {
  const movie = await pool.query(getMovie, [movieId]);
  return movie.rows.length ? true : false;
};
