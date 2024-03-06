import { Document, ObjectId } from "mongoose";

interface IAnimeCommentLikeSchema extends Document {
  author: ObjectId;
  base: ObjectId;
  createTime: Date;
  isLiked: boolean;
}

export type { IAnimeCommentLikeSchema };
