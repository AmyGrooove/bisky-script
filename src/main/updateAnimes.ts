import { getNewIDs } from "../sub/getNewIDs.js"
import { getUpdateIDs } from "../sub/getUpdateIDs.js"
import { updateByID } from "../sub/updateByID.js"

const updateAnimes = async () => {
  const animesIds =
    process.argv[2] === "new" ? await getNewIDs() : await getUpdateIDs()

  await updateByID(animesIds)

  console.log("end")
  process.exit()
}

updateAnimes()
