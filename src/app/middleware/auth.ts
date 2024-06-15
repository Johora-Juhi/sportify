import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/User/user.model";
import { TUserRole } from "../modules/User/user.interface";

const auth = (...requiresRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // auth check
    const token = req.headers.authorization;
    if (!token) {
      // throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }

    // token check
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const { email, role } = decoded;

    const isUserExists = await User.isUserExists(email);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // const isUserDeleted = isUserExists?.isDeleted;

    // if (isUserDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
    // }

    // const userStatus = isUserExists?.status;

    // if (userStatus === "blocked") {
    //   throw new AppError(httpStatus.FORBIDDEN, "User is blocked!");
    // }

    // if (
    //   isUserExists?.passwordUpdatedAt &&
    //   User.isJWTIssuedBeforePasswordChange(
    //     iat as number,
    //     isUserExists?.passwordUpdatedAt
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!s");
    // }

    if (requiresRoles && !requiresRoles.includes(role)) {
      // throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }
    req.user = decoded;
    next();
  });
};

export default auth;
