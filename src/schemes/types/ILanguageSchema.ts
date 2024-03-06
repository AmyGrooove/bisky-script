import { Document } from "mongoose";

interface ILanguageSchema extends Document {
  en: string | null;
  ru: string | null;
}

export type { ILanguageSchema };
