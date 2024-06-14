import { z } from "zod";
import { userRole } from "./user.constants";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Username is required!" }),
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
    phone: z.string({ required_error: "Phone number is required!" }),
    role: z.enum([...(userRole as [string, ...string[]])]),
    address: z.string({ required_error: "Address is required!" }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
