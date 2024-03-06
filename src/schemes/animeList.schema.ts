import mongoose, { Schema } from "mongoose";
import { IAnimeListSchema } from "./types/IAnimeListSchema.js";
import { EStatus } from "./types/EStatus.js";

const AnimeListSchema = new Schema<IAnimeListSchema>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    base: { type: mongoose.Types.ObjectId, ref: "Anime", required: true },
    createTime: { type: Date, default: new Date(), required: true },
    status: {
      type: String,
      enum: EStatus,
      default: EStatus.anons,
      required: true,
    },
  },
  { versionKey: false },
);

export { AnimeListSchema };
