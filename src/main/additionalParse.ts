import { createConnection } from "mongoose"
import { GenresSchema } from "../schemes/genres.js"
import { StudiosSchema } from "../schemes/studios.js"
import { DEV_URL, PROD_URL, SHIKI_API, UPDATE_ALL } from "../utils/constants.js"
import axios from "axios"
import { ShikiGenres, ShikiStudios } from "../interfaces/shiki.js"

const devDB = createConnection(DEV_URL)
const prodDB = createConnection(PROD_URL)

const GenresDEV = devDB.model("Genres", GenresSchema, "Genres")
const GenresPROD = prodDB.model("Genres", GenresSchema, "Genres")

const StudiosDEV = devDB.model("Studios", StudiosSchema, "Studios")
const StudiosPROD = prodDB.model("Studios", StudiosSchema, "Studios")

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

  await GenresDEV.bulkWrite(operations1)
  await StudiosDEV.bulkWrite(operations2)

  if (UPDATE_ALL) {
    await GenresPROD.bulkWrite(operations1)
    await StudiosPROD.bulkWrite(operations2)
  }

  process.exit()
}

additionalParse()
