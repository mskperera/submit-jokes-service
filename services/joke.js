const { default: axios } = require("axios");

exports.getJokeTypes_srv = async () => {
  try {
    const response = await axios.get("http://localhost:3333/jokes/types");

    return response.data;
  } catch (err) {
    throw err;
  }
};