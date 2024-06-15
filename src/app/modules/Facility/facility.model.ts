import { Schema, model } from "mongoose";
import { FacilityModel, IFacility } from "./facility.interface";

const FacilitySchema = new Schema<IFacility, FacilityModel>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

FacilitySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

FacilitySchema.statics.isFacilityExists = async function (id: string) {
  return await Facility.findById(id);
};

FacilitySchema.statics.isFacilityExistsByName = async function (name: string) {
  return await Facility.findOne({ name });
};

export const Facility = model<IFacility, FacilityModel>(
  "Facility",
  FacilitySchema
);
