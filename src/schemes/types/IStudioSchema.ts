import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IStudioSchema extends Partial<Document> {
  name: string;
  description: ILanguageSchema;
  logo: string | null;
}

export type { IStudioSchema };
