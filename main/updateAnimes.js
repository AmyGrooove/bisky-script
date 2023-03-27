const getUpdateIds = require("../sub/getUpdateIds");
const getNewIds = require("../sub/getNewIds");
const updateByQuery = require("../sub/updateByQuery");

const updateAnimes = async () => {
  const animesIds =
    process.argv[2] === "new" ? await getNewIds() : await getUpdateIds();

  await updateByQuery(animesIds);

  console.log("end");
  process.exit();
};

updateAnimes();
