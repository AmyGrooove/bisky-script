const mongoose = require("mongoose")

const AnimeInfoSchema = new mongoose.Schema({
  shiki_id: { type: Number, required: true, unique: true },
  labels: {
    type: [String],
    required: true,
    set: (value) => {
      const [first, second, ...sortArr] = Array.from(new Set(value))
      return [first, second, ...sortArr.sort()].filter((item) => item !== null)
    },
  },
  poster: {
    type: mongoose.Schema.Types.Mixed,
    set: (value) =>
      value.indexOf("missing") === -1
        ? value.slice(0, -15).substring(24)
        : null,
  },
  kind: {
    type: String,
    enum: ["tv", "movie", "ova", "ona", "special", "music"],
  },
  scores: [{ type: Number, set: (value) => Number(value) }],
  status: {
    type: String,
    required: true,
    enum: ["anons", "ongoing", "released"],
  },
  episodes: {
    count: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value !== 0 ? value : null),
    },
    aired: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value !== 0 ? value : null),
    },
    duration: { type: Number },
    next_episode_at: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value ? new Date(value) : null),
    },
  },
  dates: {
    aired_on: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value ? new Date(value) : null),
    },
    released_on: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value ? new Date(value) : null),
    },
  },
  rating: {
    type: String,
    enum: ["none", "g", "pg", "pg_13", "r", "r_plus", "rx"],
  },
  description: {
    type: mongoose.Schema.Types.Mixed,
    set: (value) =>
      value
        ? value
            .replace(/<(?!br\s*\/?)[^>]*>/gi, "")
            .replace(/<br\s[^>]*>/gi, "<br>")
            .replace(/\[[^\]]*\]/g, "")
            .replace(/\r\n/g, "<br>")
        : null,
  },
  screenshots: [
    {
      type: String,
      set: (value) => value.slice(0, -15).substring(29),
    },
  ],
  videos: [
    {
      type: String,
      set: (value) =>
        value.replace("youtube.com", "youtu.be").replace("watch?v=", ""),
    },
  ],
  genres: [Number],
  studios: [Number],
  relations: {
    franchise: {
      type: mongoose.Schema.Types.Mixed,
      set: (value) => (value ? value : null),
    },
    animes: [{ link_id: Number, relation: { en: String, ru: String } }],
  },
})

const PlatformSchema = new mongoose.Schema({
  platform_id: { type: Number, required: true, unique: true },
  name: String,
  icon: String,
  url: String,
})

const GenresSchema = new mongoose.Schema({
  genre_id: { type: Number, required: true, unique: true },
  name: {
    en: String,
    ru: String,
  },
  type: String,
})

const StudiosSchema = new mongoose.Schema({
  studio_id: { type: Number, required: true, unique: true },
  name: String,
  img: {
    type: mongoose.Schema.Types.Mixed,
    set: (value) => (value ? value.slice(0, -15).substring(25) : null),
  },
})

module.exports = {
  AnimeInfoSchema,
  PlatformSchema,
  GenresSchema,
  StudiosSchema,
}
