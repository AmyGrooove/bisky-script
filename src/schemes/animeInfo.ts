import { Schema } from "mongoose"
import { IAnimeInfo } from "../interfaces/schema.js"

export const AnimeInfoSchema = new Schema<IAnimeInfo>(
  {
    id: { type: Number, required: true, unique: true },
    labels: {
      type: [String],
      required: true,
      set: (value: string[]) => {
        const [first, second, ...sortArr] = Array.from(new Set(value))
        return [first, second, ...sortArr.sort()].filter(
          (item) => item !== null,
        )
      },
    },
    poster: {
      type: Schema.Types.Mixed,
      set: (value: string) =>
        value.indexOf("missing") === -1
          ? value.slice(0, -15).substring(24)
          : null,
    },
    kind: {
      type: String,
      enum: ["tv", "movie", "ova", "ona", "special", "music"],
    },
    scores: { type: Number },
    anotherScores: { type: [Number], set: (value: string) => [Number(value)] },
    status: {
      type: String,
      required: true,
      enum: ["anons", "ongoing", "released"],
    },
    episodes: {
      count: {
        type: Schema.Types.Mixed,
        set: (value: number) => (value !== 0 ? value : null),
      },
      aired: {
        type: Schema.Types.Mixed,
        set: (value: number) => (value !== 0 ? value : null),
      },
      duration: {
        type: Schema.Types.Mixed,
        set: (value: number) => (value !== 0 ? value : null),
      },
      next_episode_at: {
        type: Schema.Types.Mixed,
        set: (value: string) => (value ? new Date(value) : null),
      },
    },
    dates: {
      aired_on: {
        type: Schema.Types.Mixed,
        set: (value: string) => (value ? new Date(value) : null),
      },
      released_on: {
        type: Schema.Types.Mixed,
        set: (value: string) => (value ? new Date(value) : null),
      },
    },
    rating: {
      type: String,
      enum: ["none", "g", "pg", "pg_13", "r", "r_plus", "rx"],
    },
    description: {
      type: Schema.Types.Mixed,
      set: (value: string) =>
        value ? value.replace(/\[\[(.*?)\]\]/g, "$1") : null,
    },
    screenshots: [
      {
        type: String,
        set: (value: string) => value.slice(0, -15).substring(29),
      },
    ],
    videos: [
      {
        type: String,
        set: (value: string) =>
          value.replace("youtube.com", "youtu.be").replace("watch?v=", ""),
      },
    ],
    genres: { type: [Number], ref: "Genres" },
    studios: { type: [Number], ref: "Studios" },
    franshise: {
      name: { type: String },
      animes: [
        {
          id: { type: Number },
          relation: { en: { type: String }, ru: { type: String } },
        },
      ],
    },
    updateDate: { type: Date, required: true },
  },
  { versionKey: false },
)
