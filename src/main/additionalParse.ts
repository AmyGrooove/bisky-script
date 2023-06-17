import { connect, model } from "mongoose"
import { GenresSchema } from "../schemes/genres.js"
import { StudiosSchema } from "../schemes/studios.js"
import { MONGO_URL, SHIKI_API } from "../utils/constants.js"
import axios from "axios"
import { ShikiGenres, ShikiStudios } from "../interfaces/shiki.js"

connect(MONGO_URL)
const StudiosModel = model("Genres", GenresSchema, "Genres")
const GenresModel = model("Studios", StudiosSchema, "Studios")

const additionalParse = async () => {
  const genresArr = (
    await axios.get<ShikiGenres[]>(SHIKI_API + "/genres").then((el) => el.data)
  )
    .sort((a, b) => a.id - b.id)
    .map((el) => {
      return {
        id: el.id,
        name: {
          en: el.name,
          ru: el.russian,
        },
        type: el.kind,
      }
    })

  const studiosArr = (
    await axios
      .get<ShikiStudios[]>(SHIKI_API + "/studios")
      .then((el) => el.data)
  )
    .sort((a, b) => a.id - b.id)
    .map((el) => {
      return {
        id: el.id,
        name: el.filtered_name,
        img: el.image,
      }
    })

  const operations1 = genresArr.map((item) => {
    return {
      updateOne: {
        filter: { id: item.id },
        update: item,
        upsert: true,
      },
    }
  })

  const operations2 = studiosArr.map((item) => {
    return {
      updateOne: {
        filter: { id: item.id },
        update: item,
        upsert: true,
      },
    }
  })

  await StudiosModel.bulkWrite(operations1)
  await GenresModel.bulkWrite(operations2)

  process.exit()
}

additionalParse()
