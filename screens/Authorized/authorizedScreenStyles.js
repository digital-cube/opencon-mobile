import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },

    message: {
      fontSize: 18,
      color: theme.text,
      marginBottom: 58,
      textAlign: "center",
    },

    button: {
      padding: 15,
      marginVertical: 15,
    },

    secondaryButton: {
      backgroundColor: theme.secondaryButtonBackgroundColor,
    },

    secondaryLabel: {
      color: theme.secondaryButtonTextColor,
    },
  });
};

export default getStyles;
