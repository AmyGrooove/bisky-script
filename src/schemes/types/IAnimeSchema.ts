import { Document, ObjectId } from "mongoose";
import { EKind } from "./EKind.js";
import { EStatus } from "./EStatus.js";
import { ERating } from "./ERating.js";
import { ILanguageSchema } from "./ILanguageSchema.js";

interface ISingleEpisodeSchema extends Document {
  name: ILanguageSchema;
  airedAt: Date | null;
  duration: number;
}

interface ILabelsSchema extends Document {
  en: string[];
  ru: string[];
  other: string[];
}

interface IOtherPlatformSchema extends Document {
  score: number;
  url: string;
  platform: ObjectId;
}

interface IEpisodesSchema extends Document {
  count: number | null;
  singleEpisodes: ISingleEpisodeSchema[];
}

interface IDatesSchema extends Document {
  airedOn: Date | null;
  releasedOn: Date | null;
}

interface IAnimeSchema extends Document {
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
  screenshots: string[];
  videos: string[];
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
  ISingleEpisodeSchema,
};
