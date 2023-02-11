import { Request, Response } from "express";
import pg_format from "pg-format";
import pool from "../database/connect";
import {
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../database/queries/genre";
import { create_updateGenreInput } from "../validators/genre";

export const getGenreController = async (
  req: Request<{ id: string }, {}>,
  res: Response<create_updateGenreInput>
) => {
  /**
   * DONE: check if genre with that id exist or not
   * TODO: make search with req.query wich mean more dynamic search
   */
  const genre = await pool.query(pg_format(getGenre, "genre_id", req.params.id));
  return res.send(genre.rows[0]);
};

export const createGenreController = async (
  req: Request<{}, {}, create_updateGenreInput>,
  res: Response<create_updateGenreInput | string>
) => {
  /**
   * DONE: validate request body to match create genre criteria
   * DONE: check if name of genre is unique or not
   * DONE: create nre genre
   *
   */
  let genre = await pool.query(pg_format(getGenre, "name", req.body.name));
  if (genre.rows.length)
    return res.status(400).send("genre name already exist");

  genre = await pool.query(createGenre, [req.body.name]);
  return res.send(genre.rows[0]);
};

export const updateGenreController = async (
  req: Request<{ id: string }, {}, create_updateGenreInput>,
  res: Response<create_updateGenreInput>
) => {
  /**
   * DONE: validate parameter's id if genre exist or not
   * DONE: validate request body to match update genre or not
   * DONE: update genre
   */
  const genre = await pool.query(updateGenre, [req.body.name, req.params.id]);
  return res.send(genre.rows[0]);
};

export const deleteGenreController = async (
  req: Request<{ id: string }>,
  res: Response<{ deleted: boolean; message: string }>
) => {
  /**
   * DONE: validate parameter's id if genre exists or not
   * DONE: delete genre
   */
  await pool.query(deleteGenre, [req.params.id]);
  return res.send({ deleted: true, message: "genre deleted succesfully" });
};
