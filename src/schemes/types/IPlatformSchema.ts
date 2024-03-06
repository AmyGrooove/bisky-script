import { Document } from "mongoose";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface ILinkSchema extends Document {
  name: ILanguageSchema;
  url: string;
}

interface IPlatformSchema extends Document {
  name: ILanguageSchema;
  description: ILanguageSchema;
  urls: ILinkSchema[];
  logo: string | null;
}

export type { IPlatformSchema, ILinkSchema };
