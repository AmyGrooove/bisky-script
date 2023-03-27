require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");

const Schemes = require("./schemes");

const SHIKI_ANIME_API = "https://shikimori.one/api/animes?limit=50&status=";

mongoose.connect(
  Boolean(process.env.UPDATE_ALL) ? process.env.PROD_URL : process.env.DEV_URL,
  { useNewUrlParser: true },
);
const AnimeInfo = mongoose.model(
  "AnimeInfo",
  Schemes.AnimeInfoSchema,
  "AnimeInfo",
);

const getNewIds = async () => {
  let anonsPage = 1;
  let anonsShiki = [];

  const allAnons = await AnimeInfo.find({ status: "anons" })
    .select({ shiki_id: 1, _id: 0, episodes: 1 })
    .lean()
    .exec()
    .then((data) => data.map((el) => el.shiki_id));

  while (true) {
    try {
      const newPage = await axios
        .get(SHIKI_ANIME_API + "anons&page=" + anonsPage)
        .then((response) => response.data);

      if (newPage.length === 0) break;

      anonsShiki = anonsShiki.concat(newPage);

      console.log("anons page: " + anonsPage);
      anonsPage++;

      await new Promise((res) => setTimeout(res, 500));
    } catch (error) {
      console.log("delay... " + error.message);

      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  const nullAnons = anonsShiki
    .filter((el) => el.aired_on === null)
    .map((el) => el.id);
  const notInclude = anonsShiki
    .map((el) => el.id)
    .filter((el) => !allAnons.includes(el));
  const onlyYear = anonsShiki
    .filter(
      (el) =>
        new Date(el.aired_on).getMonth() + new Date(el.aired_on).getDate() ===
        1,
    )
    .map((el) => el.id);

  const mergedArray = nullAnons.concat(notInclude).concat(onlyYear);

  return mergedArray.filter((el, index) => mergedArray.indexOf(el) === index);
};

module.exports = getNewIds;
