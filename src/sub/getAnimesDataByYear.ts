import axios from "axios";
import {
  ERROR_DELAY_COUNT,
  PAGE_DELAY_COUNT,
  SHIKI_GRAPHQL_API,
} from "../utils/constants.js";
import { IAnimeShiki, IAnimeShikiGraph } from "../shikiTypes/IAnimeShiki.js";
import { animesQuery } from "../graphqlQuery/animesQuery.js";

const getAnimesDataByYear = async (
  from: number = new Date().getFullYear(),
  to?: number,
) => {
  let page = 1;
  let animeInfos: IAnimeShiki[] = [];

  while (true) {
    try {
      const newInfo = await axios
        .post<IAnimeShikiGraph>(SHIKI_GRAPHQL_API, {
          query: animesQuery(page, `season: "${to ? from + "_" + to : from}"`),
        })
        .then((response) => response.data.data.animes);

      if (newInfo.length === 0) break;

      animeInfos = [...animeInfos, ...newInfo];
      console.log("Page: " + page);
      page++;

      await new Promise((res) => setTimeout(res, PAGE_DELAY_COUNT));
    } catch (error: any) {
      console.log("delay... " + error.message);

      await new Promise((res) => setTimeout(res, ERROR_DELAY_COUNT));
    }
  }

  console.log("Animes received");
  return animeInfos;
};

export { getAnimesDataByYear };
