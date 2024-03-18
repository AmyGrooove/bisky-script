import mongoose, { Schema } from "mongoose";
import { IAnimeEstimateSchema } from "./types/IAnimeEstimateSchema.js";

const AnimeEstimateSchema = new Schema<IAnimeEstimateSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: { type: mongoose.Types.ObjectId, ref: "Anime", required: true },
    createTime: { type: Date, required: true, set: () => new Date() },
    score: { type: Number, required: true },
  },
  { versionKey: false },
);

export { AnimeEstimateSchema };
