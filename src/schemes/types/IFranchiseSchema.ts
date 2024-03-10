import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IFranchiseSchema extends Partial<Document> {
  name: ILanguageSchema;
  shikiId: string;
  description: ILanguageSchema;
  logo: string | null;
}

export type { IFranchiseSchema };
