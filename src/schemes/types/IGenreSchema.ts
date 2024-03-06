import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IGenreSchema extends Document {
  name: ILanguageSchema;
  description: ILanguageSchema;
}

export type { IGenreSchema };
