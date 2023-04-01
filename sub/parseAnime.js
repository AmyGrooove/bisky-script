const axios = require("axios")

const SHIKI_ANIME_API = "https://shikimori.one/api/animes/"

const parseAnime = async (shikiAnimes, count = 0) => {
  const successParse = []
  const failParse = []

  for (const animeId of shikiAnimes) {
    try {
      await new Promise((res) => setTimeout(res, 1000))

      const singlePage = await axios
        .get(SHIKI_ANIME_API + animeId)
        .then((response) => response.data)

      const screenshots = await axios
        .get(SHIKI_ANIME_API + animeId + "/screenshots")
        .then((response) => response.data.map((el) => el.original))

      const relations = await axios
        .get(SHIKI_ANIME_API + animeId + "/related")
        .then((response) => response.data)

      successParse.push({
        shiki_id: singlePage.id,
        labels: [singlePage.russian, singlePage.name].concat(
          singlePage.english,
          singlePage.japanese,
          singlePage.synonyms,
        ),
        poster: singlePage.image.original,
        kind: singlePage.kind,
        scores: [singlePage.score],
        status: singlePage.status,
        episodes: {
          count: singlePage.episodes,
          aired: singlePage.episodes_aired,
          duration: singlePage.duration,
          next_episode_at: singlePage.next_episode_at,
        },
        dates: {
          aired_on: singlePage.aired_on,
          released_on: singlePage.released_on,
        },
        rating: singlePage.rating,
        description: singlePage.description,
        screenshots: screenshots,
        videos: singlePage.videos.map((el) => el.url),
        genres: singlePage.genres.map((el) => el.id),
        studios: singlePage.studios.map((el) => el.id),
        relations: {
          franchise: singlePage.franchise,
          animes: relations.map(
            ({ relation, relation_russian, anime, manga }) => ({
              link_id: anime ? anime.id : manga.id,
              relation: { en: relation, ru: relation_russian },
            }),
          ),
        },
      })

      console.log(
        count !== undefined ? ++count + "/" + shikiAnimes.length : "parsed",
      )
    } catch (error) {
      if (error.code !== "ERR_BAD_REQUEST") {
        failParse.push(animeId)
      }
      console.log("delay... " + error.message + ". animeId: " + animeId)

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  if (failParse.length !== 0) {
    return successParse.concat(await parseAnime(failParse, count))
  } else {
    return successParse
  }
}

module.exports = parseAnime
