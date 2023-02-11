import zod from "zod";
import { isValidMovieId, isValidCustomerId } from "../utils/isValidId";

export const createRentalSchema = zod.object({
  customerId: zod
    .string({
      required_error: "customer id is required",
    })
    .refine(isValidCustomerId, (value) => ({
      message: `${value} is invalid customer id`,
    })),
  movieId: zod
    .string({
      required_error: "movie id is required",
    })
    .refine(isValidMovieId, (value) => ({
      message: `${value} is invalid movie id`,
    })),
});

export type createRentalInput = zod.infer<typeof createRentalSchema>;
