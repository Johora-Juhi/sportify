import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    description: z.string({ required_error: "Description is required!" }),
    pricePerHour: z.number({ required_error: "Price per hour is required!" }),
    location: z.string({ required_error: "Location is required!" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }).optional(),
    description: z
      .string({ required_error: "Description is required!" })
      .optional(),
    pricePerHour: z
      .number({ required_error: "Price per hour is required!" })
      .optional(),
    location: z.string({ required_error: "Location is required!" }).optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
