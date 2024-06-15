import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { User } from "../User/user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Facility } from "../Facility/facility.model";
import { calculateTotalHours } from "./booking.utils";
import { Booking } from "./booking.model";
import { BOOKING_STATUS, BookingStatus } from "./booking.constants";

const createBookingIntoDB = async (user: JwtPayload, payload: TBooking) => {
  const isFacilityExists = await Facility.findById(payload?.facility).lean();

  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility does not exists");
  }

  const totalHours = calculateTotalHours(payload?.startTime, payload?.endTime);
  const payableAmount = isFacilityExists?.pricePerHour * totalHours;

  const isUserexists = await User.isUserExists(user?.email);

  if (!isUserexists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const bookingData = {
    user: isUserexists?._id,
    ...payload,
    payableAmount,
  };

  const result = await Booking.create(bookingData);
  return result;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const getAllBookingForUserFromDB = async (user: JwtPayload) => {
  const result = await Booking.find({ user: user?.id }).populate("facility");
  return result;
};

const deleteBookingForUserFromDB = async (id: string) => {
  const isBookingExists = await Booking.findById(id);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking does not exists");
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: BOOKING_STATUS.canceled,
    },
    { new: true, runValidators: true }
  ).populate("facility");
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getAllBookingForUserFromDB,
  deleteBookingForUserFromDB,
};
