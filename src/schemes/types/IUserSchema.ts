import { Document } from "mongoose";

interface IUserSchema extends Partial<Document> {
  username: string;
  passwordHash: string;
  email: string;
  avatar: string | null;
  refreshToken: string | null;
}

export type { IUserSchema };
