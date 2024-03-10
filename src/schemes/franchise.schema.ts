import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { IFranchiseSchema } from "./types/IFranchiseSchema.js";

const FranchiseSchema = new Schema<IFranchiseSchema>(
  {
    name: { type: LanguageSchema, default: {} },
    shikiId: { type: String, required: true, unique: true },
    description: { type: LanguageSchema, default: {} },
    logo: { type: String, default: null },
  },
  { versionKey: false },
);

export { FranchiseSchema };
