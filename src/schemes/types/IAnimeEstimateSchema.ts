import { Document, ObjectId } from "mongoose";

interface IAnimeEstimateSchema extends Partial<Document> {
  author: ObjectId;
  base: ObjectId;
  createTime: Date;
  score: number;
}

export type { IAnimeEstimateSchema };
