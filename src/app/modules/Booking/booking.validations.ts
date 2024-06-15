import { z } from "zod";
import { BookingStatus } from "./booking.constants";

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: "Invalid format! Time must be in HH:MM",
  }
);

const dateValidationSchema = z.string().refine(
  (date) => {
    const regex =
      /^(202[4-9]|20[3-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(date);
  },
  {
    message: "Invalid format! Date must be in YYYY-MM-DD",
  }
);
const createBookingValidationSchema = z.object({
  body: z
    .object({
      date: dateValidationSchema,
      startTime: timeValidationSchema,
      endTime: timeValidationSchema,
      user: z.string().optional(),
      facility: z.string(),
      payableAmount: z.number().optional(),
      isBooked: z
        .enum([...(BookingStatus as [string, ...string[]])])
        .optional()
        .default("confirmed"),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time must be greater then End Time",
      }
    ),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
