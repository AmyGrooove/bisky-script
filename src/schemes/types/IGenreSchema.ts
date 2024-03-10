import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IGenreSchema extends Partial<Document> {
  name: ILanguageSchema;
  description: ILanguageSchema;
}

export type { IGenreSchema };
