import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface IFranchiseSchema extends Document {
  name: ILanguageSchema;
  description: ILanguageSchema;
  logo: string | null;
}

export type { IFranchiseSchema };
