import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./faculity,controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constants";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  ValidateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityController.createFacility
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  ValidateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityController.updateFacility
);

router.delete("/:id", auth(USER_ROLE.admin), FacilityController.deleteFacility);
router.get("/", FacilityController.getAllFacility);

export const FacilityRoutes = router;
