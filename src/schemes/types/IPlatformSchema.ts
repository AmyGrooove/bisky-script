import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IPlatformSchema extends Partial<Document> {
  name: ILanguageSchema;
  shikiId: string;
  logo: string | null;
}

export type { IPlatformSchema };
