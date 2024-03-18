import mongoose, { Schema } from "mongoose";
import { IAnimeListSchema } from "./types/IAnimeListSchema.js";
import { EStatus } from "./types/EStatus.js";

const AnimeListSchema = new Schema<IAnimeListSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: { type: mongoose.Types.ObjectId, ref: "Anime", required: true },
    createTime: { type: Date, required: true, set: () => new Date() },
    status: { type: String, enum: EStatus, required: true },
  },
  { versionKey: false },
);

export { AnimeListSchema };
