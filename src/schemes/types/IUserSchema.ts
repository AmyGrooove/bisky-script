import { Document } from "mongoose";

interface IUserSchema extends Document {
  username: string;
  password: string;
  email: string;
  avatar: string | null;
  refreshToken: string | null;
}

export type { IUserSchema };
