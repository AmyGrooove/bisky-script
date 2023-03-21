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

const getUpdateIds = async () => {
  let ongoingPage = 1;
  let ongoingShiki = [];

  let anonsPage = 1;
  let anonsShiki = [];

  const ongoingMongo = await AnimeInfo.find({ status: "ongoing" })
    .select({ shiki_id: 1, _id: 0, episodes: 1 })
    .lean()
    .exec();

  const anonsMongo = await AnimeInfo.find({ status: "anons" })
    .select({ shiki_id: 1, _id: 0, episodes: 1 })
    .lean()
    .exec();

  while (true) {
    try {
      const newPage = await axios
        .get(SHIKI_ANIME_API + "ongoing&page=" + ongoingPage)
        .then((response) => response.data);

      if (newPage.length === 0) break;

      ongoingShiki = ongoingShiki.concat(newPage);

      console.log("ongoing page: " + ongoingPage);
      ongoingPage++;

      await new Promise((res) => setTimeout(res, 500));
    } catch (error) {
      console.log("delay... " + error.message);

      await new Promise((res) => setTimeout(res, 5000));
    }
  }

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

  const ongoingMongo_ids = ongoingMongo.map((el) => el.shiki_id);
  const anonsMongo_ids = anonsMongo.map((el) => el.shiki_id);

  const ongoingIds = [
    ...ongoingShiki
      .map((el) => el.id)
      .filter((el) => !ongoingMongo_ids.includes(el)),
    ...ongoingMongo
      .filter((el) => new Date(el.episodes.next_episode_at) <= new Date())
      .map((el) => el.shiki_id),
  ];

  const anonsIds = [
    ...anonsMongo_ids
      .map((el) => el.id)
      .filter((el) => !anonsMongo.includes(el)),
    ...anonsMongo_ids
      .filter((el) => el.aired_on <= new Date() || el.aired_on === null)
      .map((el) => el.id),
  ];

  return ongoingIds
    .concat(anonsIds)
    .filter((el, index, self) => self.indexOf(el) === index)
    .filter((el) => el !== undefined);
};

module.exports = getUpdateIds;
