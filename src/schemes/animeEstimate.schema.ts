import mongoose, { Schema } from "mongoose";
import { IAnimeEstimateSchema } from "./types/IAnimeEstimateSchema.js";

const AnimeEstimateSchema = new Schema<IAnimeEstimateSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: { type: mongoose.Types.ObjectId, ref: "Anime", required: true },
    createTime: { type: Date, default: new Date(), required: true },
    score: { type: Number, default: 0, required: true },
  },
  { versionKey: false },
);

export { AnimeEstimateSchema };
