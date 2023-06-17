import { createConnection } from "mongoose"
import { AnimeInfoSchema } from "../schemes/animeInfo.js"
import { DEV_URL, PROD_URL, UPDATE_ALL } from "../utils/constants.js"
import { createArrayAnimes } from "./createArrayAnimes.js"

const devDB = createConnection(DEV_URL)
const prodDB = createConnection(PROD_URL)

const modelDEV = devDB.model("AnimeInfo", AnimeInfoSchema, "AnimeInfo")
const modelPROD = prodDB.model("AnimeInfo", AnimeInfoSchema, "AnimeInfo")

export const updateByID = async (arrID: number[]) => {
  if (arrID.length === 0) return

  try {
    const newAnimes = await createArrayAnimes(arrID)

    const operations1 = newAnimes.map((item) => {
      return {
        updateOne: {
          filter: { id: item.id },
          update: item,
          upsert: true,
        },
      }
    })

    await modelDEV.bulkWrite(operations1)

    if (UPDATE_ALL) {
      await modelPROD.bulkWrite(operations1)
    }
  } catch (error: any) {
    console.log(error)
  }
}
