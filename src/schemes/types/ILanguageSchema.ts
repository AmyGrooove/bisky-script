import { Document } from "mongoose";

interface ILanguageSchema extends Partial<Document> {
  en: string | null;
  ru: string | null;
}

export type { ILanguageSchema };
