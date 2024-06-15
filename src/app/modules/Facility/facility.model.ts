import { Schema, model } from "mongoose";
import { FacilityModel, IFacility } from "./facility.interface";

const FacilitySchema = new Schema<IFacility, FacilityModel>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<IFacility, FacilityModel>(
  "Facility",
  FacilitySchema
);
