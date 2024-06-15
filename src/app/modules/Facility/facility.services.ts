import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: IFacility) => {
  const isFacilityExistsByName = await Facility.isFacilityExistsByName(
    payload.name
  );
  if (isFacilityExistsByName) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${isFacilityExistsByName?.name} facilty already exists!`
    );
  }

  const result = await Facility.create(payload);
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<IFacility>
) => {
  const isFacilityExists = await Facility.isFacilityExists(id);
  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This facilty does not exists!");
  }

  if (isFacilityExists?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This facilty does not exists!");
  }

  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const isFacilityExists = await Facility.isFacilityExists(id);
  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This facilty does not exists!");
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Facility.find();
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
