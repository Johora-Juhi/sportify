import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";

const createUserIntoDB = async (payload: IUser) => {
  const isUserExists = User.isUserExists(payload.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User email already exists!");
  }

  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};
