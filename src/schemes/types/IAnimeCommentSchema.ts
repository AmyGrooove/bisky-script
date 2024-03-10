import { Document, ObjectId } from "mongoose";

interface IAnimeCommentSchema extends Partial<Document> {
  author: ObjectId;
  base: ObjectId;
  createTime: Date;
  updateTime: Date;
  text: string;
  violations: string[];
  parent: ObjectId | null;
}

export type { IAnimeCommentSchema };
