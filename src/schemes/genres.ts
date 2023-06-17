import { Schema } from "mongoose"
import { IGenres } from "../interfaces/schema.js"

export const GenresSchema = new Schema<IGenres>(
  {
    id: { type: Number, required: true, unique: true, ref: "AnimeInfo" },
    name: {
      en: { type: String },
      ru: { type: String },
    },
    type: { type: Schema.Types.Mixed, enum: ["anime", "manga", null] },
  },
  { versionKey: false },
)
