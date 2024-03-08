import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { IGenreSchema } from "./types/IGenreSchema.js";

const GenreSchema = new Schema<IGenreSchema>(
  {
    name: { type: LanguageSchema },
    description: { type: LanguageSchema, default: {} },
  },
  { versionKey: false },
);

export { GenreSchema };
