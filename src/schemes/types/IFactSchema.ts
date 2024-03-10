import { Document } from "mongoose";

interface IFactSchema extends Partial<Document> {
  en: string;
  ru: string;
}

export type { IFactSchema };
