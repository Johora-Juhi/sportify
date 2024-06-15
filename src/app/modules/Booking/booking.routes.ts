import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { BookingValidations } from "./booking.validations";
import { BookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constants";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  ValidateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/", auth(USER_ROLE.admin), BookingController.getAllBooking);
router.get(
  "/user",
  auth(USER_ROLE.user),
  BookingController.getAllBookingForUser
);
router.delete(
  "/:id",
  auth(USER_ROLE.user),
  BookingController.deleteBookingForUser
);

export const BookingRoutes = router;
