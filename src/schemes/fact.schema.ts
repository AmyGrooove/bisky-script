import { Schema } from "mongoose";
import { IFactSchema } from "./types/IFactSchema.js";

const FactSchema = new Schema<IFactSchema>(
  { en: { type: String }, ru: { type: String } },
  { versionKey: false },
);

export { FactSchema };
