import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { BOOKING_STATUS, BookingStatus } from "./booking.constants";

const BookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
  payableAmount: { type: Number },
  isBooked: { type: String, enum: BookingStatus, default: "confirmed" },
});

BookingSchema.pre("find", function (next) {
  this.find({ isBooked: BOOKING_STATUS.confirmed });
  next();
});
export const Booking = model<TBooking>("Booking", BookingSchema);
