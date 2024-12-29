import axios from "axios";
import envConfig from "./env-config";

const api = axios.create({
  baseURL: envConfig.BASE_API,
});

api.interceptors.request.use(
  async (config) => {

    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default api;
