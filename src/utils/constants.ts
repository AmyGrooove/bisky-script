import { configDotenv } from "dotenv";

configDotenv();

const SHIKI_GRAPHQL_API = "https://shikimori.one/api/graphql";

const MONGO_URL = process.env.MONGO_URL ?? "";

const ERROR_DELAY_COUNT = Number(process.env.ERROR_DELAY_COUNT ?? 5000);
const PAGE_DELAY_COUNT = Number(process.env.PAGE_DELAY_COUNT ?? 500);

export { SHIKI_GRAPHQL_API, MONGO_URL, ERROR_DELAY_COUNT, PAGE_DELAY_COUNT };
