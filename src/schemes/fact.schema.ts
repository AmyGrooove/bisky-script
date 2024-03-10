import { Schema } from "mongoose";
import { IFactSchema } from "./types/IFactSchema.js";

const FactSchema = new Schema<IFactSchema>(
  { en: { type: String, default: null }, ru: { type: String, default: null } },
  { versionKey: false },
);

export { FactSchema };
