import mongoose, { Schema } from "mongoose";
import { IAnimeCommentSchema } from "./types/IAnimeCommentSchema.js";

const AnimeCommentSchema = new Schema<IAnimeCommentSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: { type: mongoose.Types.ObjectId, ref: "Anime", required: true },
    createTime: { type: Date, default: new Date(), required: true },
    updateTime: { type: Date, default: new Date(), required: true },
    text: { type: String, required: true },
    violations: { type: [String] },
    parent: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "AnimeComment",
    },
  },
  { versionKey: false },
);

export { AnimeCommentSchema };
