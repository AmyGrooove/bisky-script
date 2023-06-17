import { getAnimeIDsByYear } from "../sub/getAnimeIDsByYear.js"
import { updateByID } from "../sub/updateByID.js"

const shikiParse = async () => {
  if (process.argv[2]) {
    const animesIds = await getAnimeIDsByYear(
      Number(process.argv[2]),
      Number(process.argv[3]),
    )

    await updateByID(animesIds)
  }

  console.log("end")
  process.exit()
}

shikiParse()
