import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    appVersion: {
      alignItems: "center",
      paddingBottom: 20,
    },

    appVersionText: {
      color: theme.textLight,
    },
  });
};

export default getStyles;
