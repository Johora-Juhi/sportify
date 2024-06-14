import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { UserValidations } from "../User/user.validations";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  ValidateRequest(UserValidations.createUserValidationSchema),
  AuthController.createUser
);

export const AuthRoutes = router;
