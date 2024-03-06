import mongoose, { Schema } from "mongoose";
import { IAnimeCommentLikeSchema } from "./types/IAnimeCommentLikeSchema.js";

const AnimeCommentLikeSchema = new Schema<IAnimeCommentLikeSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: {
      type: mongoose.Types.ObjectId,
      ref: "AnimeComment",
      required: true,
    },
    createTime: { type: Date, default: new Date(), required: true },
    isLiked: { type: Boolean, default: true, required: true },
  },
  { versionKey: false },
);

export { AnimeCommentLikeSchema };
