import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    content: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.modalBackgroundColor,
      paddingVertical: 16,
      paddingHorizontal: 15,
      borderRadius: 10,
      zIndex: 20,
    },

    title: {
      color: theme.title,
      fontSize: 18,
      marginBottom: 6,
      textAlign: "center",
    },

    secondaryTitle: {
      color: theme.textMedium,
      textAlign: "center",
    },

    answer: {
      marginVertical: 28,
      textAlign: "center",
      fontSize: 24,
      color: theme.text,
    },

    ratingStarsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
    },

    ratingStar: {
      marginHorizontal: 10,
    },

    actionsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginRight: 32,
      marginTop: 20,
    },

    submitBtn: {
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 18,
      marginLeft: 25,
    },

    submitBtnAllowed: {
      backgroundColor: theme.primaryButtonBackgroundColor,
    },

    disabledBtn: {
      backgroundColor: theme.disabledBackground,
    },

    submitBtnTxtAllowed: {
      color: theme.primaryButtonTextColor,
    },

    disabledBtnTxt: {
      color: theme.disabledText,
    },
  });
};

export default getStyles;
