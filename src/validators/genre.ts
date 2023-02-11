import { isValidGenreId } from "../utils/isValidId";
import zod from "zod";

export const create_updateGenreSchema = zod.object({
  name: zod
    .string({
      required_error: "genre name is required",
    })
    .min(3, "genre name too short - length should be greater than 3"),
});

export const validGenreIdParam = zod.object({
  id: zod
    .string({
      required_error: "genre id parameter is required",
    })
    .refine(isValidGenreId, (val) => ({ message: `${val} invalid genreId` })),
});

export type create_updateGenreInput = zod.infer<typeof create_updateGenreSchema>;

