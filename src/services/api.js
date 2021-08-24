import axios from "axios";

const api = axios.create({
  baseURL: "http://10.3.0.58:3333",
});

export default api;
