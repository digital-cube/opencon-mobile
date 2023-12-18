import Constants from "expo-constants";

const getServer = function () {
  const installation =
    Constants.manifest2?.extra?.expoClient?.extra?.installation;
  switch (installation) {
    case "test":
      return "https://stage.opencon.dev";
    default:
      return "https://m.opencon.dev";
  }
};
export const server = getServer();
