import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { IGenreSchema } from "./types/IGenreSchema.js";

const GenreSchema = new Schema<IGenreSchema>(
  { name: { type: LanguageSchema }, description: { type: LanguageSchema } },
  { versionKey: false },
);

export { GenreSchema };
