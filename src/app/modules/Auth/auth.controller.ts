import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import { IUser } from "../User/user.interface";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  const { password, ...userData } = result.toObject() as IUser;

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: userData,
  });
});

export const AuthController = {
  createUser,
};
