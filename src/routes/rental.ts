import { Router } from "express";
import {
  getRentalsContrller,
  addRentalController,
  backRentalController,
} from "../controllers/rental";
import validateResource from "../middleware/validateResource";
import { createRentalSchema } from "../validators/rental";
const router = Router();

router.get("/", getRentalsContrller);

router.post(
  "/",
  validateResource({
    body: createRentalSchema,
  }),
  addRentalController
);

router.put("/back/:rentalId", backRentalController);

export default router;
