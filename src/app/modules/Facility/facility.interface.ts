import { Model } from "mongoose";

export interface IFacility {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted?: boolean;
}

export interface FacilityModel extends Model<IFacility> {}
