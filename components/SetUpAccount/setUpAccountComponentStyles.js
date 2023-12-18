import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    scrollView: {
      flex: 1,
      justifyContent: "center",
    },

    modal: {
      backgroundColor: theme.modalCoverBackgroundColor,
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      padding: 16,
    },

    modalContent: {
      borderRadius: 10,
      alignSelf: "center",
      backgroundColor: theme.modalBackgroundColor,
    },

    form: {
      margin: 16,
    },

    modalTitle: {
      fontSize: 18,
      marginBottom: 28,
      fontWeight: "600",
      alignSelf: "center",
      color: theme.title,
    },

    label: {
      color: theme.text,
    },

    input: {
      backgroundColor: theme.inputBackground,
      color: theme.inputTextColor,
    },

    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },

    confirmBtn: {
      width: 120,
      backgroundColor: theme.primaryButtonBackgroundColor,
      marginLeft: 16,
    },

    confirmBtnLabel: {
      color: theme.primaryButtonTextColor,
    },
  });
};

export default getStyles;
