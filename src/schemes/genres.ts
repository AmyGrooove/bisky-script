import { Schema } from "mongoose"
import { IGenres } from "../interfaces/schema.js"

export const GenresSchema = new Schema<IGenres>(
  {
    linkId: {
      anime: { type: Schema.Types.Mixed },
      manga: { types: Number },
    },
    name: {
      en: { type: String },
      ru: { type: String },
    },
    hentai: { type: Boolean },
  },
  { versionKey: false },
)
