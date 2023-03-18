const mongoose = require("mongoose");
const axios = require("axios");

const Schemes = require("./schemes");

const SHIKI_GENRES_API = "https://shikimori.one/api/genres";
const SHIKI_STUDIOS_API = "https://shikimori.one/api/studios";

mongoose.connect("mongodb://127.0.0.1:27017/biskyDB", {
  useNewUrlParser: true,
});

const Genres = mongoose.model("Genres", Schemes.GenresSchema, "Genres");
const Studios = mongoose.model("Studios", Schemes.StudiosSchema, "Studios");

const additionalParse = async () => {
  const genresArr = (await axios.get(SHIKI_GENRES_API).then((el) => el.data))
    .sort((a, b) => a.id - b.id)
    .map((el) => {
      return {
        genre_id: el.id,
        name: {
          en: el.name,
          ru: el.russian,
        },
        type: el.kind,
      };
    });

  const studiosArr = (await axios.get(SHIKI_STUDIOS_API).then((el) => el.data))
    .sort((a, b) => a.id - b.id)
    .map((el) => {
      return {
        studio_id: el.id,
        name: el.name,
        img: el.image,
      };
    });

  await Genres.insertMany(genresArr);
  await Studios.insertMany(studiosArr);
};

additionalParse();
