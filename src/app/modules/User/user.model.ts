import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { USER_ROLE } from "./user.constants";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: USER_ROLE },
  address: { type: String, required: true },
});

export const User = model<IUser>("User", UserSchema);
