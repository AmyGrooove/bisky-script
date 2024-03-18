import { getUpdatingAnimesData } from "../sub/getUpdatingAnimesData.js";
import { updateAnimes } from "../sub/updateAnimes.js";

const parseUpdateAnimes = async () => {
  console.time("END. Script execution time");
  const animesData = await getUpdatingAnimesData();

  await updateAnimes(animesData);

  console.timeEnd("END. Script execution time");
  process.exit();
};

parseUpdateAnimes();
