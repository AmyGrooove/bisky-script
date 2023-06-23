import { IAnimeInfoParse } from "../interfaces/parse.js"
import {
  ShikiAnime,
  ShikiRelated,
  ShikiScreenShots,
} from "../interfaces/shiki.js"
import { SHIKI_API } from "../utils/constants.js"
import axios from "axios"

export const parseAnimeByID = async (animeID: number) => {
  const mainInfo = await axios
    .get<ShikiAnime>(SHIKI_API + "/animes/" + animeID)
    .then((response) => response.data)

  const screenshots = await axios
    .get<ShikiScreenShots[]>(SHIKI_API + "/animes/" + animeID + "/screenshots")
    .then((response) => response.data.map((el) => el.original))

  const relations = await axios
    .get<ShikiRelated[]>(SHIKI_API + "/animes/" + animeID + "/related")
    .then((response) => response.data)

  const anime: IAnimeInfoParse = {
    id: mainInfo.id,
    labels: [
      mainInfo.russian,
      mainInfo.name,
      ...mainInfo.english,
      ...mainInfo.japanese,
      ...mainInfo.synonyms,
    ].filter((el): el is string => el !== null),
    poster: mainInfo.image.original,
    kind: mainInfo.kind,
    scores: 0,
    anotherScores: [Number(mainInfo.score)],
    status: mainInfo.status,
    episodes: {
      count: mainInfo.episodes,
      aired: mainInfo.episodes_aired,
      duration: mainInfo.duration,
      nextEpisodeAt: mainInfo.next_episode_at,
    },
    dates: {
      airedOn: mainInfo.aired_on,
      releasedOn: mainInfo.released_on,
    },
    rating: mainInfo.rating,
    description: mainInfo.description,
    screenshots: screenshots,
    videos: mainInfo.videos.map((el) => el.url),
    genres: mainInfo.genres.map((el) => el.id),
    studios: mainInfo.studios.map((el) => el.id),
    franshice: {
      name: mainInfo.franchise,
      animes: relations.map((el) => ({
        id: el.anime ? el.anime.id : (el.manga.id as number),
        relation: { en: el.relation, ru: el.relation_russian },
      })),
    },
    updateDate: new Date(),
  }

  return anime
}
