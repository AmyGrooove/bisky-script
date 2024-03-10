import { connect, model } from "mongoose";
import { AnimeSchema } from "../schemes/anime.schema.js";
import { MONGO_URL } from "../utils/constants.js";

connect(MONGO_URL);
const AnimeModel = model("Anime", AnimeSchema, "Anime");

const updateAnimesRelations = async () => {
  const allAnimes = await AnimeModel.find().lean().exec();

  const operations = await Promise.all(
    allAnimes.map(async (el) => {
      const relationAnimes = await AnimeModel.find({
        shikiId: { $in: el.related.map((item) => item.shikiId) },
      })
        .select("_id shikiId")
        .lean()
        .exec();

      const newAnime = {
        ...el,
        related: el.related.map((item) => ({
          ...item,
          base:
            relationAnimes.find((relation) => relation.shikiId === item.shikiId)
              ?._id ?? null,
        })),
      };

      return {
        updateOne: {
          filter: { shikiId: el.shikiId },
          update: newAnime as Record<string, any>,
          upsert: true,
        },
      };
    }),
  );

  await AnimeModel.bulkWrite(operations);
};

export { updateAnimesRelations };
