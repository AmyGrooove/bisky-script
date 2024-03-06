import { Document, ObjectId } from "mongoose";
import { EStatus } from "./EStatus.js";

interface IAnimeListSchema extends Document {
  author: ObjectId;
  base: ObjectId;
  createTime: Date;
  status: EStatus;
}

export type { IAnimeListSchema };
