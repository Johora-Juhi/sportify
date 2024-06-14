/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { userRole } from "./user.constants";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser, UserModel>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, select: 0 },
  phone: { type: String, required: true },
  role: { type: String, enum: userRole },
  address: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  const user = this; // doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware/ hook : will work on create() and save()
// UserSchema.post("save", function (doc, next) {
//     // doc.password = undefined;
//     delete doc._doc.password; // Remove the password field from the returned object

//   next();
// });

UserSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select(
    "+password"
  ).lean(); /** i have selected 0 for not fetchin the password for every find operation, 
    so where i need to access it i have to add it in the select with + so that it comes with other data,
     otherwise it will onkly fetch password data */
};

UserSchema.statics.isPasswordMatched = async function (
    plainPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };

export const User = model<IUser, UserModel>("User", UserSchema);
