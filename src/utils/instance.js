import axios from "axios";

// export const instance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_API,

// });
axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
axios.defaults.headers.common = {
  Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
};
export default axios;
