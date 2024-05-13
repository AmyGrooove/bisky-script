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
    const newAnimes = await Promise.all(
      animes.map(async (el) => {
        const animeGenres: ObjectId[] = (
          await GenreModel.find({
            "name.en": { $in: el.genres.map((item) => item.name) },
          })
            .select("_id")
            .lean()
            .exec()
        ).map((item) => item._id);

        // const animePlatforms: Partial<IOtherPlatformSchema>[] = (
        //   await PlatformModel.find({
        //     shikiId: { $in: el.externalLinks.map((item) => item.kind) },
        //   })
        //     .select("_id")
        //     .lean()
        //     .exec()
        // ).map((item, index) => ({
        //   url: el.externalLinks[index].url,
        //   platform: item._id,
        // }));

        const animeInfo: Partial<IAnimeSchema> | null =
          await AnimeModel.findOne({
            shikiId: el.id,
          })
            .select("episodes description")
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

        const animeStudios: ObjectId[] = (
          await StudioModel.find({
            name: { $in: el.studios.map((item) => item.name) },
          })
            .select("_id")
            .lean()
            .exec()
        ).map((item) => item._id);

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

        const animeFranchise: ObjectId | null =
          (
            await FranchiseModel.findOne({ shikiId: el.franchise })
              .select("_id")
              .lean()
              .exec()
          )?._id ?? null;

        return {
          shikiId: Number(el.id),
          labels: {
            en: el.name,
            ru: el.russian,
            synonyms: [el.japanese, ...el.synonyms].filter((item) => item),
          },
          poster: el.poster?.originalUrl ?? null,
          kind: el.kind,
          otherPlatforms: [],
          // animePlatforms,
          status: el.status,
          episodes: {
            count: el.episodes === 0 ? null : Number(el.episodes),
            airedCount:
              el.status === "released"
                ? el.episodes
                : el.episodesAired === 0
                ? null
                : Number(el.episodesAired),
            duration:
              el.duration === null || el.duration === 0
                ? null
                : Number(el.duration),
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
                : null,
          },
          dates: {
            airedOn: el.airedOn.date ? new Date(el.airedOn.date) : null,
            releasedOn: el.releasedOn.date
              ? new Date(el.releasedOn.date)
              : null,
          },
          rating: el.rating,
          description: {
            ru:
              el.description
                ?.replace(/\r\n/g, "")
                .replace(/\[\[(.*?)\]\]/g, "$1")
                .replace(/\[[^\]]*]/g, "")
                .replace(/\([^)]*\)/g, "") ?? null,
            en: animeInfo?.description?.en ?? null,
          },
          related: el.related
            .map((item) => ({
              base: null,
              shikiId: item.anime?.id ? Number(item.anime?.id) : null,
              relation: { ru: item.relationRu, en: item.relationEn },
            }))
            .filter((item) => item.shikiId),
          screenshots: el.screenshots.map((item) => item.originalUrl),
          videos: el.videos.map((item) => ({ name: item.name, url: item.url })),
          genres: animeGenres,
          studios: animeStudios,
          franchise: animeFranchise,
          updateDate: new Date(),
        } as IAnimeSchema;
      }),
    );

    const operations = newAnimes.map((item) => ({
      updateOne: {
        filter: { shikiId: item.shikiId },
        update: item as Record<string, any>,
        upsert: true,
      },
    }));

    await AnimeModel.bulkWrite(operations);
    console.log("Database updated");

    await updateAnimesRelations();
  } catch (error) {
    console.error(error);
  }
};

export { updateAnimes };
