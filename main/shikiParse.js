const getAnimeIdsByYear = require("../sub/getAnimeIdsByYear");
const updateByQuery = require("../sub/updateByQuery");

const shikiParse = async () => {
  if (process.argv[2]) {
    if (/\[[^\]]*\]/g.test(process.argv[2])) {
      await updateByQuery(JSON.parse(process.argv[2]));
    } else {
      const animesIds = await getAnimeIdsByYear(
        process.argv[2],
        process.argv[3],
      );
      await updateByQuery(animesIds);
    }
  }

  console.log("end");
  process.exit();
};

shikiParse();
