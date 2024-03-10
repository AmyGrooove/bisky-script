import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { IPlatformSchema } from "./types/IPlatformSchema.js";

const PlatformSchema = new Schema<IPlatformSchema>(
  {
    name: { type: LanguageSchema, default: {} },
    shikiId: { type: String, required: true, unique: true },
    logo: { type: String, default: null },
  },
  { versionKey: false },
);

export { PlatformSchema };
