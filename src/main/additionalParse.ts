import { connect, model } from "mongoose"
import { GenresSchema } from "../schemes/genres.js"
import { StudiosSchema } from "../schemes/studios.js"
import { MONGO_URL, SHIKI_API } from "../utils/constants.js"
import axios from "axios"
import { ShikiGenres, ShikiStudios } from "../interfaces/shiki.js"
import { IGenresParse } from "../interfaces/parse.js"

connect(MONGO_URL)
const StudiosModel = model("Genres", GenresSchema, "Genres")
const GenresModel = model("Studios", StudiosSchema, "Studios")

const additionalParse = async () => {
  const genresArr = (
    await axios.get<ShikiGenres[]>(SHIKI_API + "/genres").then((el) => el.data)
  ).sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1

    if (a.id < b.id) return -1
    if (a.id > b.id) return 1

    return 0
  })

  const newGenresArr: IGenresParse[] = []

  for (let i = 0; i < genresArr.length; i++) {
    if (genresArr[i].name !== genresArr[i + 1].name) {
      newGenresArr.push({
        linkId: {
          anime: null,
          manga: genresArr[i].id,
        },
        name: {
          en: genresArr[i].name,
          ru: genresArr[i].russian,
        },
        hentai:
          genresArr[i].russian === "Эротика" ||
          genresArr[i].russian === "Хентай" ||
          genresArr[i].russian === "Яой" ||
          genresArr[i].russian === "Юри",
      })

      continue
    }

    newGenresArr.push({
      linkId: {
        anime: genresArr[i].id,
        manga: genresArr[++i].id,
      },
      name: {
        en: genresArr[i].name,
        ru: genresArr[i].russian,
      },
      hentai:
        genresArr[i].russian === "Эротика" ||
        genresArr[i].russian === "Хентай" ||
        genresArr[i].russian === "Яой" ||
        genresArr[i].russian === "Юри",
    })
  }

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

  const operations1 = newGenresArr.map((item) => {
    return {
      updateOne: {
        filter: { "linkId.anime": item.linkId.anime },
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

  await GenresModel.bulkWrite(operations2)
  await StudiosModel.bulkWrite(operations1)

  process.exit()
}

additionalParse()
