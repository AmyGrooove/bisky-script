import { connect, model } from "mongoose"
import { AnimeInfoSchema } from "../schemes/animeInfo.js"
import { MONGO_URL } from "../utils/constants.js"
import { createArrayAnimes } from "./createArrayAnimes.js"

connect(MONGO_URL)
const AnimeModel = model("AnimeInfo", AnimeInfoSchema, "AnimeInfo")

export const updateByID = async (arrID: number[]) => {
  if (arrID.length === 0) return

  try {
    const newAnimes = await createArrayAnimes(arrID)

    const operations = newAnimes.map((item) => {
      return {
        updateOne: {
          filter: { id: item.id },
          update: item,
          upsert: true,
        },
      }
    })

    await AnimeModel.bulkWrite(operations)
  } catch (error: any) {
    console.log(error)
  }
}
