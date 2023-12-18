import axios from "axios";
import { storageGetItem } from "./secureStore";

export const logger = async (log) => {
  try {
    const jwt = storageGetItem("jwt");
    const url = "https://stage.impresaone.digitalcube.dev/svcapp/logger";
    await axios.post(
      url,
      { log },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
