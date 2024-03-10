import { Schema } from "mongoose";
import { IUserSchema } from "./types/IUserSchema.js";

const UserSchema = new Schema<IUserSchema>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    refreshToken: { type: String, default: null },
  },
  { versionKey: false },
);

export { UserSchema };
