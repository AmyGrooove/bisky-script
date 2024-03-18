import { configDotenv } from "dotenv";

configDotenv();

const SHIKI_API = process.env.SHIKI_API ?? "https://shikimori.one/api";
const SHIKI_GRAPHQL_API =
  SHIKI_API + (process.env.SHIKI_GRAPHQL_API ?? "/graphql");

const MONGO_URL = process.env.MONGO_URL ?? "";

const ERROR_DELAY_COUNT = Number(process.env.ERROR_DELAY_COUNT ?? 5000);
const PAGE_DELAY_COUNT = Number(process.env.PAGE_DELAY_COUNT ?? 500);

export {
  SHIKI_API,
  SHIKI_GRAPHQL_API,
  MONGO_URL,
  ERROR_DELAY_COUNT,
  PAGE_DELAY_COUNT,
};
