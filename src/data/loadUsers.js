import axios from "axios";

const USER_URL = "https://randomuser.me/api/";

const loadUserData = async count => {
  if (count === undefined) count = 5;
  let url = `${USER_URL}?results=${count}`;
  return await axios.get(url, { headers: { mode: "no-cors" } });
};

export default loadUserData;
