import axios from "axios";

export const getTokenInfo = async () => {
  let res = await axios.get("https://interview.switcheo.com/prices.json");

  return res.data;
};
