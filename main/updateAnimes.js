const getUpdateIds = require("../sub/getUpdateIds");
const updateByQuery = require("../sub/updateByQuery");

const updateAnimes = async () => {
  const animesIds = await getUpdateIds();
  await updateByQuery(animesIds);

  console.log("end");
  process.exit();
};

updateAnimes();
