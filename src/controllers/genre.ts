import { Request, Response } from "express";
import { create_updateGenreInput } from "../validators/genre";
import { Genre } from "../database/entities";

export const getGenreController = async (
  req: Request<{ id: string }, {}>,
  res: Response
) => {
  /**
   * DONE: check if genre with that id exist or not
   * TODO: make search with req.query wich mean more dynamic search
   */
  const id: number = parseInt(req.params.id as string);
  const genre = await Genre.findOne({ where: { genre_id: id } });
  return res.send(genre);
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
  let genre = await Genre.findOne({ where: { name: req.body.name } });
  if (genre) return res.status(400).send("genre name already exist");

  genre = await Genre.create({ name: req.body.name }).save();
  return res.send(genre);
};

export const updateGenreController = async (
  req: Request<{ id: string }, {}, create_updateGenreInput>,
  res: Response
) => {
  /**
   * DONE: validate parameter's id if genre exist or not
   * DONE: validate request body to match update genre or not
   * DONE: update genre
   */
  const id: number = parseInt(req.params.id as string);
  let genre = await Genre.createQueryBuilder("genres")
    .update(Genre)
    .set(req.body)
    .where("genre_id = :id ", { id })
    .returning("*")
    .execute();
  return res.send(genre.raw[0]);
};

export const deleteGenreController = async (
  req: Request<{ id: string }>,
  res: Response<{ deleted: boolean; message: string }>
) => {
  /**
   * DONE: validate parameter's id if genre exists or not
   * DONE: delete genre
   */
  const id: number = parseInt(req.params.id as string);
  const { affected } = await Genre.delete({ genre_id: id });

  return res.send({
    deleted: Boolean(affected),
    message: affected
      ? "genre deleted succesfully"
      : "not deleted something went wrong",
  });
};
