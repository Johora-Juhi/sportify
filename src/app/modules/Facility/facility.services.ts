import { IFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: IFacility) => {
  const result = await Facility.create(payload);
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
};
