import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./faculity,controller";

const router = Router();

router.post(
  "/",
  ValidateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityController.createFacility
);

export const FacilityRoutes = router;
