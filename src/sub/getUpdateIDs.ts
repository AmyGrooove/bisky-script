import { createConnection } from "mongoose"
import { AnimeInfoSchema } from "../schemes/animeInfo.js"
import { DEV_URL } from "../utils/constants.js"

const devDB = createConnection(DEV_URL)

const modelDEV = devDB.model("AnimeInfo", AnimeInfoSchema, "AnimeInfo")

export const getUpdateIDs = async () => {
  const updatesIds = await modelDEV
    .find({
      $or: [
        {
          status: "anons",
          "dates.aired_on": { $ne: null, $lte: new Date() },
        },
        { status: "ongoing", "episodes.next_episode_at": { $lte: new Date() } },
      ],
    })
    .select({ shiki_id: 1, _id: 0, dates: 1 })
    .lean()
    .exec()
    .then((data) =>
      data
        .filter(
          (el) =>
            new Date(el.dates.aired_on || 0).getMonth() +
              new Date(el.dates.aired_on || 0).getDate() !==
            1,
        )
        .map((el) => el.id),
    )

  return updatesIds
}
