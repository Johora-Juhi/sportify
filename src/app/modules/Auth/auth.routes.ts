import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { UserValidations } from "../User/user.validations";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  ValidateRequest(UserValidations.createUserValidationSchema),
  AuthController.createUser
);

router.post(
  "/login",
  ValidateRequest(AuthValidations.loginUserValidationSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
