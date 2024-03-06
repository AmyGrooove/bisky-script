import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { IFranchiseSchema } from "./types/IFranchiseSchema.js";

const FranchiseSchema = new Schema<IFranchiseSchema>(
  {
    name: { type: LanguageSchema },
    description: { type: LanguageSchema },
    logo: { type: String, default: null },
  },
  { versionKey: false },
);

export { FranchiseSchema };
