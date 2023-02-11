import { isValidGenreId, isValidMovieId } from "../utils/isValidId";
import zod from "zod";

export const createMovieSchema = zod.object({
  title: zod
    .string({
      required_error: "movie title is required",
    })
    .min(5, "movie title too short - should be at least 5 length")
    .max(50, "movie title too long - should be at least 50 length "),
  genreId: zod
    .number({
      required_error: "movie genre Id is required",
    })
    .refine(isValidGenreId, (val) => ({ message: `${val} invalid genreID` })),
  numberInStock: zod.number({
    required_error: "number of movies in stock is required",
  }),
  dailyRentalRate: zod.number({
    required_error: "daily rental rate is required",
  }),
});

export const updateMovieSchema = createMovieSchema.partial();

export const validMovieIdParam = zod.object({
  id: zod
    .number({
      required_error: "movie id parameter is required",
    })
    .refine(isValidMovieId, (val) => ({ message: `${val} invalid movieID` })),
});

export type createMovieInput = zod.infer<typeof createMovieSchema>;
export type updateMovieInput = zod.infer<typeof updateMovieSchema>;
