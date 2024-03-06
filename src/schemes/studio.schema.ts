import { Schema } from "mongoose";
import { IStudioSchema } from "./types/IStudioSchema.js";
import { LanguageSchema } from "./language.schema.js";

const StudioSchema = new Schema<IStudioSchema>(
  {
    name: { type: LanguageSchema },
    description: { type: LanguageSchema },
    logo: { type: String, default: null },
  },
  { versionKey: false },
);

export { StudioSchema };
