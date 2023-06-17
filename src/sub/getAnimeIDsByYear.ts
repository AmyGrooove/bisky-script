import axios from "axios"
import { SHIKI_API } from "../utils/constants.js"
import { ShikiPage } from "../interfaces/shiki.js"

export const getAnimeIDsByYear = async (from: number, to?: number) => {
  const newAPI =
    SHIKI_API +
    "/animes?limit=50&season=" +
    (to ? from + "_" + to : from) +
    "&page="

  let page = 1
  let animesPages: number[] = []

  while (true) {
    try {
      const newPage = await axios
        .get<ShikiPage[]>(newAPI + page)
        .then((response) => response.data.map((el) => el.id))

      if (newPage.length === 0) break

      animesPages = [...animesPages, ...newPage]
      console.log("Page: " + page)
      page++

      await new Promise((res) => setTimeout(res, 500))
    } catch (error: any) {
      console.log("delay... " + error.message)

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  console.log("IDs received")
  return animesPages
}
