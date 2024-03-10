import { getAnimesDataByYear } from "../sub/getAnimesDataByYear.js";
import { updateAnimes } from "../sub/updateAnimes.js";
import { updateAnimesRelations } from "../sub/updateAnimesRelations.js";

const parseAnimes = async () => {
  if (!process.argv[2]) throw new Error("Missing input data");

  const animesIds = await getAnimesDataByYear(
    Number(process.argv[2]),
    Number(process.argv[3]),
  );

  await updateAnimes(animesIds);

  await updateAnimesRelations();

  console.log("end");
  process.exit();
};

parseAnimes();
