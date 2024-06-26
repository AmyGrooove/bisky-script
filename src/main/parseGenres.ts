import axios from "axios";
import { IGenresShiki } from "../shikiTypes/IGenresShiki.js";
import { MONGO_URL, SHIKI_GRAPHQL_API } from "../utils/constants.js";
import { connect, model } from "mongoose";
import { GenreSchema } from "../schemes/genre.schema.js";
import { genresQuery } from "../graphqlQuery/genresQuery.js";

connect(MONGO_URL);
const GenreModel = model("Genre", GenreSchema, "Genre");

const parseGenres = async () => {
  console.time("END. Script execution time");

  try {
    const mainInfo = await axios
      .post<IGenresShiki>(SHIKI_GRAPHQL_API, {
        query: genresQuery(),
      })
      .then((response) => response.data.data.genres);

    const operations = mainInfo.map((el) => ({
      updateOne: {
        filter: { name: { en: el.name, ru: el.russian } },
        update: { name: { en: el.name, ru: el.russian } },
        upsert: true,
      },
    }));

    await GenreModel.bulkWrite(operations);
  } catch (error) {
    console.error(error);
  }

  console.timeEnd("END. Script execution time");
  process.exit();
};

parseGenres();
