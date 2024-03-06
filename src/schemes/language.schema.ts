import { Schema } from "mongoose";
import { ILanguageSchema } from "./types/ILanguageSchema.js";

const LanguageSchema = new Schema<ILanguageSchema>(
  { en: { type: String, default: null }, ru: { type: String, default: null } },
  { _id: false, versionKey: false },
);

export { LanguageSchema };
