import { IAnimeInfoParse } from "../interfaces/parse.js"
import { parseAnimeByID } from "./parseAnimeByID.js"

export const createArrayAnimes = async (
  arrID: number[],
  count = 0,
): Promise<IAnimeInfoParse[]> => {
  const successParse: IAnimeInfoParse[] = []
  const failParse: number[] = []

  for (const animeID of arrID) {
    try {
      await new Promise((res) => setTimeout(res, 1000))

      successParse.push(await parseAnimeByID(animeID))

      console.log(++count + "/" + arrID.length)
    } catch (error: any) {
      if (error.code !== "ERR_BAD_REQUEST") {
        failParse.push(animeID)
      }
      console.log("delay... " + error.message + ". animeID: " + animeID)

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  if (failParse.length !== 0) {
    return successParse.concat(await createArrayAnimes(failParse, count))
  } else {
    return successParse
  }
}
