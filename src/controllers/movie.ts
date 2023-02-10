import { Request, Response } from "express";
import pg_format from "pg-format";
import pool from "../database/connect";
import {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../database/queries/movie";
import { createMovieInput, updateMovieInput } from "../validators/movie";

export const getMovieController = async (
  req: Request<{ id: string }>,
  res: Response<createMovieInput | string>
) => {
  /**
   * DONE: check if provided id found or not
   */
  const movie = await pool.query(getMovie, [req.params.id]);
  if (!movie.rows.length) return res.status(404).send("no file with that id ");
  return res.send(movie.rows[0]);
};

export const createMovieController = async (
  req: Request<{}, {}, createMovieInput>,
  res: Response<createMovieInput>
) => {
  /**
   * DONE: validate request body to match create movie criteria
   * DONE: create movie
   * */

  const { title, dailyRentalRate, numberInStock, genreId } = req.body;
  const movie = await pool.query(createMovie, [
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  ]);
  return res.send(movie.rows[0]);
};

export const updateMovieController = async (
  req: Request<{ id: string }, {}, updateMovieInput>,
  res: Response<createMovieInput>
) => {
  /**
   * DONE: validate movie id in parameters
   * DONE: validate request body to check if it match criteria
   * DONE: update movie
   */
  const movie = await pool.query(
    pg_format(updateMovie, "title", req.body.title, req.params.id)
  );
  return res.send(movie.rows[0]);
};

export const deleteMovieController = async (
  req: Request<{ id: string }>,
  res: Response<boolean>
) => {
  /**
   * DONE: validate if movie id exists
   * DONE: delete movie
   */
  await pool.query(deleteMovie, [req.params.id]);
  res.send(true);
};
