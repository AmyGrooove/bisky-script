import { Document } from "mongoose";

interface IFactSchema extends Document {
  en: string;
  ru: string;
}

export type { IFactSchema };
