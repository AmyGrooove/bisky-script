import mongoose, { Schema } from "mongoose";
import {
  IAnimeSchema,
  IDatesSchema,
  IEpisodesSchema,
  ILabelsSchema,
  IOtherPlatformSchema,
  IRelatedAnimeSchema,
  ISingleEpisodeSchema,
  IVideoSchema,
} from "./types/IAnimeSchema.js";
import { EKind } from "./types/EKind.js";
import { EStatus } from "./types/EStatus.js";
import { ERating } from "./types/ERating.js";
import { LanguageSchema } from "./language.schema.js";

const SingleEpisodeSchema = new Schema<ISingleEpisodeSchema>(
  {
    name: { type: String, default: null },
    airedAt: { type: Date, default: null },
    duration: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false },
);

const LabelsSchema = new Schema<ILabelsSchema>(
  {
    en: { type: String, default: null },
    ru: { type: String, default: null },
    synonyms: { type: [String], default: [] },
  },
  { _id: false, versionKey: false },
);

const OtherPlatformSchema = new Schema<IOtherPlatformSchema>(
  {
    url: { type: String, required: true },
    platform: {
      type: mongoose.Types.ObjectId,
      ref: "Platform",
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const EpisodesSchema = new Schema<IEpisodesSchema>(
  {
    count: { type: Number, default: null },
    singleEpisodes: { type: [SingleEpisodeSchema], default: [] },
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

const RelatedAnimeSchema = new Schema<IRelatedAnimeSchema>(
  {
    base: { type: mongoose.Types.ObjectId, ref: "Anime", default: null },
    shikiId: { type: Number, required: true },
    relation: { type: LanguageSchema, default: {} },
  },
  { _id: false, versionKey: false },
);

const VideoSchema = new Schema<IVideoSchema>(
  {
    name: { type: String, default: null },
    url: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

const AnimeSchema = new Schema<IAnimeSchema>(
  {
    shikiId: { type: Number, required: true, unique: true },
    labels: { type: LabelsSchema, default: {} },
    poster: { type: String, default: null },
    kind: { type: String, enum: EKind, default: EKind.none },
    otherPlatforms: { type: [OtherPlatformSchema], default: [] },
    status: { type: String, enum: EStatus, default: EStatus.anons },
    episodes: { type: EpisodesSchema, default: {} },
    dates: { type: DatesSchema, default: {} },
    rating: { type: String, enum: ERating, default: ERating.none },
    description: { type: LanguageSchema, default: {} },
    related: { type: [RelatedAnimeSchema], default: [] },
    screenshots: { type: [String], default: [] },
    videos: { type: [VideoSchema], default: [] },
    genres: { type: [mongoose.Types.ObjectId], default: [], ref: "Genre" },
    studios: { type: [mongoose.Types.ObjectId], default: [], ref: "Studio" },
    franchise: {
      type: mongoose.Types.ObjectId,
      ref: "Franchise",
      default: null,
    },
    updateDate: { type: Date, required: true },
  },
  { versionKey: false },
);

export { AnimeSchema };
