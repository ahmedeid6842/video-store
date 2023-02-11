import { Router } from "express";
import {
  getCustomerController,
  createCustomerController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customer";
import {
  createCustomerSchema,
  updateCustomerSchema,
  validCustomerIdParam,
} from "../validators/customer";
import validateResource from "../middleware/validateResource";
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/:id", getCustomerController);

router.post(
  "/",
  isAuth,
  validateResource({ body: createCustomerSchema }),
  createCustomerController
);

router.put(
  "/:id",
  validateResource({
    body: updateCustomerSchema,
    params: validCustomerIdParam,
  }),
  isAuth,
  updateCustomerController
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  validateResource({
    params: validCustomerIdParam,
  }),
  deleteCustomerController
);

export default router;
