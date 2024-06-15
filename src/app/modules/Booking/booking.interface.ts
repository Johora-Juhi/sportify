import { Types } from "mongoose";
import { BOOKING_STATUS } from "./booking.constants";

export type TBookingStatus = keyof typeof BOOKING_STATUS;

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount?: number;
  isBooked?: TBookingStatus;
};
