import { Document, Schema } from "mongoose"

const mongoose = require("mongoose")

interface IAnimeInfo extends Document {
  _id: number
  labels: string[]
  poster: string | null
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
  scores: number
  anotherScores: number[]
}

const AnimeInfoSchema = new Schema<IAnimeInfo>({
  _id: { type: Number, required: true, unique: true },
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
  scores: [{ type: Number }],
})

console.log(2323)
