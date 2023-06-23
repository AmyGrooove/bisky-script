import { Document } from "mongoose"

interface IAnimeInfo extends Document {
  id: number
  labels: string[]
  poster: string | null
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
  scores: number
  anotherScores: number[]
  status: "anons" | "ongoing" | "released"
  episodes: {
    count: number | null
    aired: number | null
    duration: number | null
    nextEpisodeAt: string | null
  }
  dates: {
    airedOn: string | null
    releaseOn: string | null
  }
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"
  description: string | null
  screenshots: string[]
  videos: string[]
  genres: number[]
  studios: number[]
  franshice: {
    name: string
    animes: { id: number; relation: { en: string; ru: string } }[]
  }
  updateDate: Date
}

interface IFranshice extends Document {
  id: number
  name: string
  animes: number[]
}

interface IGenres extends Document {
  linkId: {
    anime: number | null
    manga: number
  }
  name: {
    en: string
    ru: string
  }
  hentai: boolean
}

interface IStudios extends Document {
  id: number
  name: string
  img: string | null
}

export { IAnimeInfo, IFranshice, IGenres, IStudios }
