import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payload: IUser) => {
  const isUserExists = await User.isUserExists(payload.email);
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User email already exists!");
  }

  const result = await User.create(payload);
  return result;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  const isUserExists = await User.isUserExists(payload?.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  if (
    !(await User.isPasswordMatched(payload?.password, isUserExists?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password did not match!");
  }

  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    userData: isUserExists,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUserFromDB,
};
