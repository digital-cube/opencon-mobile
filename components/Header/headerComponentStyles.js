import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },

    goBackBtn: {
      position: "absolute",
      alignSelf: "center",
    },

    goBackIcon: {
      color: theme.title,
    },

    mainTitle: {
      fontSize: 26,
      fontWeight: "500",
      color: theme.title,
    },

    mainSecondaryTitle: {
      color: theme.secondaryTitle,
      marginTop: 6,
      fontSize: 15,
    },
  });
};

export default getStyles;
