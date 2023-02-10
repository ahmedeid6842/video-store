import { Router } from "express";
import { loginController, registerController } from "../controllers/user";
import validateResource from "../middleware/validateResource";
import { registerSchema, loginSchema } from "../validators/user";
const router = Router();

router.post(
  "/register",
  validateResource({ body: registerSchema }),
  registerController
);
router.post("/login", validateResource({ body: loginSchema }), loginController);

export default router;
