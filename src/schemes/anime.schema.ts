import mongoose, { Schema } from "mongoose";
import {
  IAnimeSchema,
  IDatesSchema,
  IEpisodesSchema,
  ILabelsSchema,
  IOtherPlatformSchema,
  ISingleEpisodeSchema,
} from "./types/IAnimeSchema.js";
import { EKind } from "./types/EKind.js";
import { EStatus } from "./types/EStatus.js";
import { ERating } from "./types/ERating.js";
import { LanguageSchema } from "./language.schema.js";

const SingleEpisodeSchema = new Schema<ISingleEpisodeSchema>(
  {
    name: { type: LanguageSchema },
    airedAt: { type: Date, default: null },
    duration: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false },
);

const LabelsSchema = new Schema<ILabelsSchema>(
  {
    en: { type: [String] },
    ru: { type: [String] },
    other: { type: [String] },
  },
  { _id: false, versionKey: false },
);

const OtherPlatformSchema = new Schema<IOtherPlatformSchema>(
  {
    score: { type: Number, default: 0 },
    url: { type: String, required: true },
    platform: { type: mongoose.Types.ObjectId, ref: "Platform" },
  },
  { _id: false, versionKey: false },
);

const EpisodesSchema = new Schema<IEpisodesSchema>(
  {
    count: { type: Number, default: null },
    singleEpisodes: { type: [SingleEpisodeSchema] },
  },
  { _id: false, versionKey: false },
);

const DatesSchema = new Schema<IDatesSchema>(
  {
    airedOn: { type: Date, default: null },
    releasedOn: { type: Date, default: null },
  },
  { _id: false, versionKey: false },
);

const AnimeSchema = new Schema<IAnimeSchema>(
  {
    shikiId: { type: Number, required: true, unique: true },
    labels: { type: LabelsSchema },
    poster: { type: String, default: null },
    kind: { type: String, enum: EKind, default: EKind.none },
    otherPlatforms: { type: [OtherPlatformSchema] },
    status: { type: String, enum: EStatus, default: EStatus.anons },
    episodes: { type: EpisodesSchema },
    dates: { type: DatesSchema },
    rating: { type: String, enum: ERating, default: ERating.none },
    description: { type: LanguageSchema },
    screenshots: { type: [String] },
    videos: { type: [String] },
    genres: { type: [mongoose.Types.ObjectId], ref: "Genre" },
    studios: { type: [mongoose.Types.ObjectId], ref: "Studio" },
    franchise: {
      type: mongoose.Types.ObjectId,
      ref: "Franchise",
      default: null,
    },
    updateDate: { type: Date, required: true, default: new Date() },
  },
  { versionKey: false },
);

export { AnimeSchema };
