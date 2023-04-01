require("dotenv").config()

const mongoose = require("mongoose")
const Schemes = require("./schemes")

mongoose.connect(
  Boolean(process.env.UPDATE_ALL) ? process.env.PROD_URL : process.env.DEV_URL,
  { useNewUrlParser: true },
)
const AnimeInfo = mongoose.model(
  "AnimeInfo",
  Schemes.AnimeInfoSchema,
  "AnimeInfo",
)

const getUpdateIds = async () => {
  const updatesIds = await AnimeInfo.find({
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
            new Date(el.dates.aired_on).getMonth() +
              new Date(el.dates.aired_on).getDate() !==
            1,
        )
        .map((el) => el.shiki_id),
    )

  return updatesIds
}

module.exports = getUpdateIds
