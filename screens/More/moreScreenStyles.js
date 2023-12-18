import { StyleSheet, Dimensions } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 20,
    },

    header: {
      marginBottom: 30,
    },

    displayName: {
      color: theme.title,
      fontWeight: "600",
      fontSize: 26,
      marginBottom: 5,
    },

    text: {
      fontSize: 16,
    },

    email: {
      color: theme.primary,
      fontSize: 16,
    },

    listItemContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
    },

    noUnderline: {
      borderBottomWidth: 0,
    },

    listItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
    },

    itemIcon: {
      color: theme.textMedium,
      marginRight: 10,
    },

    itemText: {
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },

    itemSecondIcon: {
      color: theme.textMedium,
      alignSelf: "flex-end",
    },

    appVersion: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },

    appVersionText: {
      color: theme.textLight,
    },
  });
};

export default getStyles;
