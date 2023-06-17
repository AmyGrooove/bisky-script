import { connect, model } from "mongoose"
import { AnimeInfoSchema } from "../schemes/animeInfo.js"
import { MONGO_URL, SHIKI_API } from "../utils/constants.js"
import axios from "axios"
import { ShikiPage } from "../interfaces/shiki.js"

connect(MONGO_URL)
const AnimeModel = model("AnimeInfo", AnimeInfoSchema, "AnimeInfo")

export const getNewIDs = async () => {
  const allAnons = await AnimeModel.find({ status: "anons" })
    .select({ shiki_id: 1, _id: 0 })
    .lean()
    .exec()
    .then((data) => data.map((el) => el.id))

  let anonsPage = 1
  let anonsShiki: ShikiPage[] = []

  while (true) {
    try {
      const newPage = await axios
        .get<ShikiPage[]>(
          SHIKI_API + "/animes?limit=50&status=anons&page=" + anonsPage,
        )
        .then((response) => response.data)

      if (newPage.length === 0) break

      anonsShiki = anonsShiki.concat(newPage)

      console.log("anons page: " + anonsPage)
      anonsPage++

      await new Promise((res) => setTimeout(res, 500))
    } catch (error: any) {
      console.log("delay... " + error.message)

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  const nullAnons = anonsShiki
    .filter((el) => el.aired_on === null)
    .map((el) => el.id)
  const notInclude = anonsShiki
    .map((el) => el.id)
    .filter((el) => !allAnons.includes(el))
  const onlyYear = anonsShiki
    .filter(
      (el) =>
        new Date(el.aired_on || 0).getMonth() +
          new Date(el.aired_on || 0).getDate() ===
        1,
    )
    .map((el) => el.id)

  const mergedArray = nullAnons.concat(notInclude).concat(onlyYear)

  return mergedArray.filter((el, index) => mergedArray.indexOf(el) === index)
}
