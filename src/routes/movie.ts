import { Router } from "express";
import {
  createMovieSchema,
  updateMovieSchema,
  validMovieIdParam,
} from "../validators/movie";
import {
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movie";

import validateResource from "../middleware/validateResource";
const router = Router();

router.get("/:id", getMovieController);
router.post(
  "/",
  validateResource({ body: createMovieSchema }),
  createMovieController
);
router.put(
  "/:id",
  validateResource({
    body: updateMovieSchema,
    params: validMovieIdParam,
  }),
  updateMovieController
);
router.delete(
  "/:id",
  validateResource({ params: validMovieIdParam }),
  deleteMovieController
);

export default router;
