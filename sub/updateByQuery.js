const mongoose = require("mongoose");
const fs = require("fs");

const parseAnime = require("./parseAnime");
const Schemes = require("./schemes");

mongoose.connect("mongodb://127.0.0.1:27017/biskyDB", {
  useNewUrlParser: true,
});
const AnimeInfo = mongoose.model(
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

    const operations = newAnimes.map((anime) => {
      return {
        updateOne: {
          filter: { shiki_id: anime.shiki_id },
          update: anime,
          upsert: true,
        },
      };
    });

    await AnimeInfo.bulkWrite(operations)
      .then(() => console.log("Successfully updated"))
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateByQuery;
