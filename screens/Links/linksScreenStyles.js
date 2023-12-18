import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      margin: 20,
      flex: 1,
    },

    linksContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });
};

export default getStyles;
