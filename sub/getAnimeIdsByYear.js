const axios = require("axios")
const fs = require("fs")

const SHIKI_ANIME_API = "https://shikimori.one/api/animes?limit=50&season="

const getAnimeIdsByYear = async (from, to) => {
  let page = 1
  let animesPages = []

  const newApi = SHIKI_ANIME_API + (to ? from + "_" + to : from) + "&page="

  while (true) {
    try {
      const newPage = await axios
        .get(newApi + page)
        .then((response) => response.data.map((el) => el.id))

      if (newPage.length === 0) break

      animesPages = animesPages.concat(newPage)

      console.log("page: " + page)
      page++

      await new Promise((res) => setTimeout(res, 500))
    } catch (error) {
      console.log("delay... " + error.message)

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  if (!fs.existsSync("./json_results")) {
    fs.mkdirSync("./json_results", { recursive: true })
  }

  const fileName = `./json_results/animesIds_${
    to ? from + "_" + to : from
  }.json`
  await fs.promises.writeFile(
    fileName,
    JSON.stringify({ count: animesPages.length, ids: animesPages }),
  )
  console.log("animesIds saved to JSON")

  return animesPages
}

module.exports = getAnimeIdsByYear
