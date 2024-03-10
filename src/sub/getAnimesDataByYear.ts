import axios from "axios";
import { SHIKI_GRAPHQL_API } from "../utils/constants.js";
import { IAnimeShiki, IAnimeShikiGraph } from "../shikiTypes/IAnimeShiki.js";

const getAnimesDataByYear = async (from: number, to?: number) => {
  let page = 1;
  let animeInfos: IAnimeShiki[] = [];

  while (true) {
    try {
      const mainInfo = await axios
        .post<IAnimeShikiGraph>(SHIKI_GRAPHQL_API, {
          query: `
      {
        animes(limit: 50, page: ${page}, season: "${
            to ? from + "_" + to : from
          }") {
          id
          name
          russian
          licenseNameRu
          english
          japanese
          synonyms
          kind
          rating
          score
          status
          episodes
          episodesAired
          franchise
          nextEpisodeAt
          duration
          airedOn {
            date
          }
          releasedOn {
            date
          }
          url

          poster {
            originalUrl
          }

          createdAt

          genres {
            name
          }
          studios {
            name
            imageUrl
          }

          externalLinks {
            kind
            url
          }

          related {
            anime {
              id
            }
            relationRu
            relationEn
          }

          videos {
            url
            name
          }
          screenshots {
            originalUrl
          }

          description
        }
      }
    `,
        })
        .then((response) => response.data.data.animes);

      if (mainInfo.length === 0) break;

      animeInfos = [...animeInfos, ...mainInfo];
      console.log("Page: " + page);
      page++;

      await new Promise((res) => setTimeout(res, 500));
    } catch (error: any) {
      console.log("delay... " + error.message);

      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  console.log("Animes received");
  return animeInfos;
};

export { getAnimesDataByYear };
