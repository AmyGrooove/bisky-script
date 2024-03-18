import { getAnimesDataByYear } from "../sub/getAnimesDataByYear.js";
import { updateAnimes } from "../sub/updateAnimes.js";

const parseAnimesByYear = async () => {
  if (!process.argv[2]) throw new Error("Missing input data");
  console.time("END. Script execution time");

  const animesData = await getAnimesDataByYear(
    Number(process.argv[2]),
    Number(process.argv[3]),
  );

  await updateAnimes(animesData);

  console.timeEnd("END. Script execution time");
  process.exit();
};

parseAnimesByYear();
