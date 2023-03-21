require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");

const parseAnime = require("./parseAnime");
const Schemes = require("./schemes");

const devDB = mongoose.createConnection(process.env.DEV_URL, {
  useNewUrlParser: true,
});
const prodDB = mongoose.createConnection(process.env.PROD_URL, {
  useNewUrlParser: true,
});

const devModel = devDB.model("AnimeInfo", Schemes.AnimeInfoSchema, "AnimeInfo");
const prodModel = prodDB.model(
  "AnimeInfo",
  Schemes.AnimeInfoSchema,
  "AnimeInfo",
);

const updateByQuery = async (arrIds) => {
  try {
    const newAnimes = await parseAnime(arrIds);

    if (!fs.existsSync("./json_results")) {
      fs.mkdirSync("./json_results", { recursive: true });
    }

    let fileNumber = 1;
    let fileName = `./json_results/updateByQuery_${fileNumber}.json`;
    while (fs.existsSync(fileName)) {
      fileNumber++;
      fileName = `./json_results/updateByQuery_${fileNumber}.json`;
    }

    await fs.promises.writeFile(
      fileName,
      JSON.stringify({
        ids: arrIds,
        jsons: newAnimes,
      }),
    );
    console.log("newAnimes saved to JSON");

    const operations1 = newAnimes.map((anime) => {
      return {
        updateOne: {
          filter: { shiki_id: anime.shiki_id },
          update: anime,
          upsert: true,
        },
      };
    });

    const operations2 = newAnimes.map((anime) => {
      return {
        updateOne: {
          filter: { shiki_id: anime.shiki_id },
          update: anime,
          upsert: true,
        },
      };
    });

    await devModel
      .bulkWrite(operations1)
      .then(() => console.log("Successfully updated - dev"))
      .catch((error) => console.error(error));
    if (Boolean(process.env.UPDATE_ALL)) {
      await prodModel
        .bulkWrite(operations2)
        .then(() => console.log("Successfully updated - prod"))
        .catch((error) => console.error(error));
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateByQuery;
