import { Document, ObjectId } from "mongoose";

interface IAnimeEstimateSchema extends Document {
  author: ObjectId;
  base: ObjectId;
  createTime: Date;
  score: number;
}

export type { IAnimeEstimateSchema };
