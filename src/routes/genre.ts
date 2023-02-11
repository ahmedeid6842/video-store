import { Router } from "express";
import {
  create_updateGenreSchema,
  validGenreIdParam,
} from "../validators/genre";
import ValidateResource from "../middleware/validateResource";
import {
  getGenreController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} from "../controllers/genre";

const router = Router();

router.get("/:id", getGenreController);

router.post(
  "/",
  ValidateResource({ body: create_updateGenreSchema }),
  createGenreController
);

router.put(
  "/:id",
  ValidateResource({
    body: create_updateGenreSchema,
    params: validGenreIdParam,
  }),
  updateGenreController
);

router.delete(
  "/:id",
  ValidateResource({ params: validGenreIdParam }),
  deleteGenreController
);

export default router;
