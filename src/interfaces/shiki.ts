interface ShikiGenres {
  id: number
  name: string
  russian: string
  kind: string | null
}

interface ShikiStudios {
  id: number
  name: string
  filtered_name: string
  real: boolean
  image: string | null
}

interface ShikiAnime {
  id: number
  name: string
  russian: string
  image: {
    original: string
    preview: string
    x96: string
    x48: string
  }
  url: string
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
  score: string
  status: "anons" | "ongoing" | "released"
  episodes: number
  episodes_aired: number
  aired_on: string | null
  released_on: string | null
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"
  english: (string | null)[]
  japanese: string[]
  synonyms: string[]
  license_name_ru: string | null
  duration: number
  description: string | null
  description_html: string
  description_source: any
  franchise: string
  favoured: boolean
  anons: boolean
  ongoing: boolean
  thread_id: number
  topic_id: number
  myanimelist_id: number
  rates_scores_stats: { name: number; value: number }[]
  rates_statuses_stats: { name: string; value: number }[]
  updated_at: string
  next_episode_at: string | null
  fansubbers: string[]
  fandubbers: string[]
  licensors: string[]
  genres: { id: number; name: string; russian: string; kind: string | null }[]
  studios: {
    id: number
    name: string
    filtered_name: string
    real: boolean
    image: string | null
  }[]
  videos: {
    id: number
    url: string
    image_url: string
    player_url: string
    name: string
    kind: string
    hosting: string
  }[]
  screenshots: {
    original: string
    preview: string
  }[]
  user_rate: any | null
}

interface ShikiScreenShots {
  original: string
  preview: string
}

interface ShikiRelated {
  relation: string
  relation_russian: string
  anime: ShikiPage
  manga: any
}

interface ShikiPage {
  id: number
  name: string
  russian: string
  image: {
    original: string
    preview: string
    x96: string
    x48: string
  }
  url: string
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
  score: string
  status: "anons" | "ongoing" | "released"
  episodes: number
  episodes_aired: number
  aired_on: string | null
  released_on: string | null
}

export {
  ShikiGenres,
  ShikiStudios,
  ShikiRelated,
  ShikiAnime,
  ShikiScreenShots,
  ShikiPage,
}
