import { Router } from "express";
import {
  getRentalsContrller,
  getRentalController,
  addRentalController,
  backRentalController,
} from "../controllers/rental";
import validateResource from "../middleware/validateResource";
import { createRentalSchema } from "../validators/rental";
const router = Router();

router.get("/", getRentalsContrller);

router.get("/:customerId/:movieId", getRentalController);

router.post(
  "/",
  validateResource({
    body: createRentalSchema,
  }),
  addRentalController
);

router.put("/back/:customerId/:movieId", backRentalController);

export default router;
