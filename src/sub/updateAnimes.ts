import { IAnimeShiki } from "../shikiTypes/IAnimeShiki.js";
import { MONGO_URL } from "../utils/constants.js";
import { ObjectId, model } from "mongoose";
import { AnimeSchema } from "../schemes/anime.schema.js";
import {
  IAnimeSchema,
  // IOtherPlatformSchema,
} from "../schemes/types/IAnimeSchema.js";
import { GenreSchema } from "../schemes/genre.schema.js";
// import { PlatformSchema } from "../schemes/platform.schema.js";
import { StudioSchema } from "../schemes/studio.schema.js";
import { FranchiseSchema } from "../schemes/franchise.schema.js";
import { connect } from "mongoose";
import { updateAnimesRelations } from "./updateAnimesRelations.js";
import { checkFirstTimeMore } from "../utils/checkFirstTimeMore.js";

connect(MONGO_URL);
const AnimeModel = model("Anime", AnimeSchema, "Anime");
const GenreModel = model("Genre", GenreSchema, "Genre");
// const PlatformModel = model("Platform", PlatformSchema, "Platform");
const StudioModel = model("Studio", StudioSchema, "Studio");
const FranchiseModel = model("Franchise", FranchiseSchema, "Franchise");

const updateAnimes = async (animes: IAnimeShiki[] = []) => {
  try {
    let newAnimesSeries = 0;

    const newAnimes = await Promise.all(
      animes.map(async (el) => {
        const animeGenres = (
          await GenreModel.find({
            "name.en": { $in: el.genres.map((item) => item.name) },
          })
            .select("_id")
            .lean()
            .exec()
        ).map((item) => item._id) as ObjectId[];

        // const animePlatforms: Partial<IOtherPlatformSchema>[] = (
        //   await PlatformModel.find({
        //     shikiId: { $in: el.externalLinks.map((item) => item.kind) },
        //   })
        //     .select("_id")
        //     .lean()
        //     .exec()
        // ).map((item, index) => ({
        //   url: el.externalLinks[index].url,
        //   platform: item._id as ObjectId,
        // }));

        const animeInfo: Partial<IAnimeSchema> | null =
          await AnimeModel.findOne({ shikiId: el.id })
            .select(
              "shikiId labels poster kind otherPlatforms status episodes dates rating description related screenshots videos genres studios franchise",
            )
            .lean()
            .exec();

        const studioOperations = el.studios.map((item) => ({
          updateOne: {
            filter: { name: item.name },
            update: { name: item.name, logo: item.imageUrl ?? null },
            upsert: true,
          },
        }));

        await StudioModel.bulkWrite(studioOperations);

        const animeStudios = (
          await StudioModel.find({
            name: { $in: el.studios.map((item) => item.name) },
          })
            .select("_id")
            .lean()
            .exec()
        ).map((item) => item._id) as ObjectId[];

        if (el.franchise) {
          const franchiseOperation = [
            {
              updateOne: {
                filter: { shikiId: el.franchise },
                update: { shikiId: el.franchise },
                upsert: true,
              },
            },
          ];

          await FranchiseModel.bulkWrite(franchiseOperation);
        }

        const animeFranchise = ((
          await FranchiseModel.findOne({ shikiId: el.franchise })
            .select("_id")
            .lean()
            .exec()
        )?._id ?? null) as ObjectId | null;

        if (
          checkFirstTimeMore(
            el.nextEpisodeAt,
            animeInfo?.episodes?.nextEpisodeAiredDate,
          )
        )
          newAnimesSeries++;

        const animeData = {
          shikiId: Number(el.id),
          dates: {
            airedOn: el.airedOn.date ? new Date(el.airedOn.date) : null,
            releasedOn: el.releasedOn.date
              ? new Date(el.releasedOn.date)
              : null,
          },
          description: {
            en: animeInfo?.description?.en ?? null,
            ru:
              el.description
                ?.replace(/\r\n/g, "")
                .replace(/\[\[(.*?)\]\]/g, "$1")
                .replace(/\[[^\]]*]/g, "")
                .replace(/\([^)]*\)/g, "") ?? null,
          },
          episodes: {
            count: el.episodes === 0 ? null : Number(el.episodes),
            airedCount:
              el.status === "released"
                ? el.episodes
                : el.episodesAired === 0
                ? null
                : Number(el.episodesAired),
            nextEpisodeAiredDate: el.nextEpisodeAt
              ? new Date(el.nextEpisodeAt)
              : null,
            lastEpisodeAiredDate:
              el.status === "released" &&
              (el.releasedOn.date || el.airedOn.date)
                ? new Date(el.releasedOn.date ?? el.airedOn.date)
                : el.status === "anons"
                ? null
                : checkFirstTimeMore(
                    el.nextEpisodeAt,
                    animeInfo?.episodes?.nextEpisodeAiredDate,
                  )
                ? animeInfo?.episodes?.nextEpisodeAiredDate
                : animeInfo?.episodes?.lastEpisodeAiredDate ?? null,
            duration:
              el.duration === null || el.duration === 0
                ? null
                : Number(el.duration),
          },
          franchise: animeFranchise,
          genres: animeGenres,
          kind: el.kind,
          labels: {
            en: el.name,
            ru: el.russian,
            synonyms: [el.japanese, ...el.synonyms].filter((item) => item),
          },
          otherPlatforms: [],
          // animePlatforms,
          poster: el.poster?.originalUrl ?? null,
          rating: el.rating,
          related: el.related
            .map((item) => ({
              base: null,
              shikiId: item.anime?.id ? Number(item.anime?.id) : null,
              relation: { en: item.relationEn, ru: item.relationRu },
            }))
            .filter((item) => item.shikiId),
          screenshots: el.screenshots.map((item) => item.originalUrl),
          status: el.status,
          studios: animeStudios,
          videos: el.videos.map((item) => ({ name: item.name, url: item.url })),
          updateDate: new Date(),
        } as IAnimeSchema;

        const checkAnimeData = ["updateDate"].reduce(
          (object: any, key) => (delete object[key], object),
          { ...animeData },
        );
        const checkAnimeInfo = ["_id"].reduce(
          (object: any, key) => (delete object[key], object),
          { ...animeInfo },
        );
        checkAnimeInfo.related?.map((item: any) => (item.base = null));

        return JSON.stringify(checkAnimeData) === JSON.stringify(checkAnimeInfo)
          ? null
          : animeData;
      }),
    );

    console.log(
      newAnimesSeries === 0
        ? "There's no new anime series"
        : `Only so many anime have a new series out (${newAnimesSeries})`,
    );

    const operations = newAnimes
      .filter((item) => item !== null)
      .map((item) => ({
        updateOne: {
          filter: { shikiId: item?.shikiId },
          update: item as Record<string, any>,
          upsert: true,
        },
      }));

    if (operations.length > 0) {
      await AnimeModel.bulkWrite(operations);
      console.log(`Database updated (${operations.length})`);

      await updateAnimesRelations();
    } else {
      console.log("No changes detected, database not updated");
    }
  } catch (error) {
    console.error(error);
  }
};

export { updateAnimes };
