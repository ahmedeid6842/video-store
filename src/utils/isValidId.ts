import { Customer, Genre, Movie } from "../database/entities";

export const isValidGenreId = async (genreId: string) => {
  const id: number = parseInt(genreId as string);
  const genre = await Genre.findOne({ where: { genre_id: id } });
  return genre ? true : false;
};

export const isValidMovieId = async (movie_id: string) => {
  const id: number = parseInt(movie_id as string);
  const movie = await Movie.findOne({ where: { movie_id:id } });
  return movie ? true : false;
};

export const isValidCustomerId = async (customerId: string) => {
  const id: number = parseInt(customerId as string);
  const customer = await Customer.findOne({ where: { customer_id: id } });
  return customer ? true : false;
};
