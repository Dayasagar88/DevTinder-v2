import axios from "axios";

const api = axios.create({
  baseURL: "https://devtinder-v2.onrender.com/api",
  withCredentials: true
});

export default api;
