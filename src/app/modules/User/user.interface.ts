import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type TUserRole = keyof typeof USER_ROLE;

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
