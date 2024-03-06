import { Schema } from "mongoose";
import { LanguageSchema } from "./language.schema.js";
import { ILinkSchema, IPlatformSchema } from "./types/IPlatformSchema.js";

const LinkSchema = new Schema<ILinkSchema>(
  { name: { type: LanguageSchema }, url: { type: String, required: true } },
  { _id: false, versionKey: false },
);

const PlatformSchema = new Schema<IPlatformSchema>(
  {
    name: { type: LanguageSchema },
    description: { type: LanguageSchema },
    urls: { type: [LinkSchema] },
    logo: { type: String, default: null },
  },
  { versionKey: false },
);

export { PlatformSchema };
