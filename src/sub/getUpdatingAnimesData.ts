import axios from "axios";
import { animesQuery } from "../graphqlQuery/animesQuery.js";
import { IAnimeShiki, IAnimeShikiGraph } from "../shikiTypes/IAnimeShiki.js";
import {
  ERROR_DELAY_COUNT,
  MONGO_URL,
  PAGE_DELAY_COUNT,
  SHIKI_GRAPHQL_API,
} from "../utils/constants.js";
import { EStatus } from "../schemes/types/EStatus.js";
import { connect, model } from "mongoose";
import { AnimeSchema } from "../schemes/anime.schema.js";

connect(MONGO_URL);
const AnimeModel = model("Anime", AnimeSchema, "Anime");

const getUpdatingAnimesData = async () => {
  let page = 1;
  let animeInfos: IAnimeShiki[] = [];

  while (true) {
    try {
      const newInfo = await axios
        .post<IAnimeShikiGraph>(SHIKI_GRAPHQL_API, {
          query: animesQuery(page, `status: "!${EStatus.released}"`),
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

  console.log(`Ongoing/Anons Animes received (${animeInfos.length})`);
  page = 1;

  const releasedAnimeIds = (
    await AnimeModel.find({
      status: { $in: [EStatus.anons, EStatus.ongoing] },
      shikiId: { $nin: animeInfos.map((el) => el.id) },
    })
  ).map((el) => el.shikiId);

  while (releasedAnimeIds.length !== 0) {
    try {
      const newInfo = await axios
        .post<IAnimeShikiGraph>(SHIKI_GRAPHQL_API, {
          query: animesQuery(page, `ids: "${releasedAnimeIds.join(", ")}"`),
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

  console.log(
    releasedAnimeIds.length === 0
      ? "No anime released yet"
      : `Released Anime received (${releasedAnimeIds.length})`,
  );

  return animeInfos;
};

export { getUpdatingAnimesData };
