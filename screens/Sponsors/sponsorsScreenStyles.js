import { StyleSheet } from "react-native";

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 0,
    },

    sponsorsContainer: {
      marginTop: 32,
    },

    sponsor: {
      alignItems: "center",
      marginBottom: 40,
    },
  });
};

export default getStyles;
