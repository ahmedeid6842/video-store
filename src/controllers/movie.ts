import { Request, Response } from "express";
import { In } from "typeorm";
import { Genre, Movie } from "../database/entities";
import { createMovieInput, updateMovieInput } from "../validators/movie";

export const getMovieController = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response<Omit<createMovieInput, "genreId"> | string>
) => {
  /**
   * DONE: check if provided id found or not
   */
  const movie = await Movie.findOne({ where: { movie_id: parseInt(req.params.id) } });
  if (!movie) return res.status(404).send("no file with that id ");

  return res.send(movie);
};

export const createMovieController = async (
  req: Request<{}, {}, createMovieInput>,
  res: Response<Movie | string>
) => {
  /**
   * DONE: validate request body to match create movie criteria
   * DONE: create movie
   * */
  let genres = await Genre.find({
    where: { genre_id: In(req.body.genreId) },
  });

  if (genres.length < req.body.genreId.length)
    return res.status(404).send("invalid genreId");

  const movieEntry = {
    ...req.body,
    genres,
  };

  const movie2 = await Movie.create(movieEntry).save();

  return res.send(movie2);
};

export const updateMovieController = async (
  req: Request<{ id: string }, {}, updateMovieInput>,
  res: Response
) => {
  /**
   * DONE: validate movie id in parameters
   * DONE: validate request body to check if it match criteria
   * DONE: update movie
   */
  const id: number = parseInt(req.params.id as string);

  let movie = await Movie.createQueryBuilder("movies")
    .update(Movie)
    .set(req.body)
    .where("movie_id = :id ", { id })
    .returning("*")
    .execute();

  return res.send(movie);
};

export const deleteMovieController = async (
  req: Request<{ id: string }>,
  res: Response<{ deleted: boolean; message: string }>
) => {
  /**
   * DONE: validate if movie id exists
   * DONE: delete movie
   */

  const id: number = parseInt(req.params.id as string);
  await Movie.createQueryBuilder("movies")
    .delete()
    .from(Movie)
    .where("movie_id=:id", { id })
    .execute();
  return res.send({ deleted: true, message: "movie deleted succesfully" });
};
