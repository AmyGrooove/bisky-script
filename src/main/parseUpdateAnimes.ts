import { getUpdatingAnimesData } from "../sub/getUpdatingAnimesData.js";
import { updateAnimes } from "../sub/updateAnimes.js";

const parseUpdateAnimes = async () => {
  const animesData = await getUpdatingAnimesData();

  await updateAnimes(animesData);

  console.log("end");
  process.exit();
};

parseUpdateAnimes();
