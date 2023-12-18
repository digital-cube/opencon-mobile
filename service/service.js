import { storageGetItem } from "../tools/secureStore";
import axios from "axios";

axios.interceptors.request.use(
  async (config) => {
    const server = await storageGetItem("server");
    const jwt = await storageGetItem("jwt");

    const configData = {
      ...config,
      baseURL: server || "https://m.opencon.dev",
    };

    if (!jwt) {
      return configData;
    }

    return {
      ...configData,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  },
  (error) => Promise.reject(error)
);

export default axios;
