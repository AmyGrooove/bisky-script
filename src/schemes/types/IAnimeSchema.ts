import { Document, ObjectId } from "mongoose";
import { EKind } from "./EKind.js";
import { EStatus } from "./EStatus.js";
import { ERating } from "./ERating.js";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface ILabelsSchema extends Partial<Document> {
  en: string | null;
  ru: string | null;
  synonyms: string[];
}

interface IOtherPlatformSchema extends Partial<Document> {
  url: string;
  platform: ObjectId;
}

interface IEpisodesSchema extends Partial<Document> {
  count: number | null;
  airedCount: number | null;
  nextEpisodeAiredDate: Date | null;
  lastEpisodeAiredDate: Date | null;
  duration: number | null;
}

interface IDatesSchema extends Partial<Document> {
  airedOn: Date | null;
  releasedOn: Date | null;
}

interface IRelatedAnimeSchema extends Partial<Document> {
  base: ObjectId | null;
  shikiId: number;
  relation: ILanguageSchema;
}

interface IVideoSchema extends Partial<Document> {
  name: string | null;
  url: string;
}

interface IAnimeSchema extends Partial<Document> {
  shikiId: number;
  labels: ILabelsSchema;
  poster: string | null;
  kind: EKind;
  otherPlatforms: IOtherPlatformSchema[];
  status: EStatus;
  episodes: IEpisodesSchema;
  dates: IDatesSchema;
  rating: ERating;
  description: ILanguageSchema;
  related: IRelatedAnimeSchema[];
  screenshots: string[];
  videos: IVideoSchema[];
  genres: ObjectId[];
  studios: ObjectId[];
  franchise: ObjectId | null;
  updateDate: Date;
}

export type {
  IAnimeSchema,
  ILabelsSchema,
  IOtherPlatformSchema,
  IEpisodesSchema,
  IDatesSchema,
  IRelatedAnimeSchema,
  IVideoSchema,
};
