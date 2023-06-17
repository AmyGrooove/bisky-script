import { Schema } from "mongoose"
import { IStudios } from "../interfaces/schema.js"

export const StudiosSchema = new Schema<IStudios>(
  {
    id: { type: Number, required: true, unique: true, ref: "AnimeInfo" },
    name: { type: String },
    img: {
      type: Schema.Types.Mixed,
      set: (value: string) =>
        value ? value.slice(0, -15).substring(25) : null,
    },
  },
  { versionKey: false },
)
