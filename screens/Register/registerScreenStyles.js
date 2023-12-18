import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    header: {
      marginTop: 20,
      alignItems: "center",
    },

    titleHeading: {
      fontSize: 24,
      lineHeight: 24,
      paddingTop: 24,
      fontWeight: "600",
      color: theme.title,
    },

    titleText: {
      color: theme.secondaryTitle,
      fontWeight: "600",
    },

    main: {
      alignItems: "center",
      marginTop: 48,
      marginHorizontal: 16,
      overflow: "hidden",
      zIndex: 1000,
    },

    continueBtn: {
      backgroundColor: theme.primaryButtonBackgroundColor,
      marginTop: 20,
    },

    continueBtnLabel: {
      color: theme.primaryButtonTextColor,
    },

    dividerPipe: {
      color: theme.divider,
      width: "100%",
    },

    dividerLabel: {
      color: theme.divider,
    },

    enterAsGuestBtn: {
      marginTop: 20,
      backgroundColor: theme.secondaryButtonBackgroundColor,
    },

    enterAsGuestBtnLabel: {
      color: theme.secondaryButtonTextColor,
    },

    signInButtonsLabel: {
      color: theme.secondaryButtonTextColor,
    },

    footer: {
      width: "100%",
      alignItems: "center",
      marginTop: 40,
    },

    prompt: {
      flexDirection: "row",
      alignItems: "center",
    },

    promptBtnLabel: {
      color: theme.secondaryButtonTextColor,
    },

    languageContainer: {
      flexDirection: "row",
      marginVertical: 32,
    },

    languageBtnText: {
      color: theme.buttonTextColor,
      paddingHorizontal: 12,
      fontSize: 18,
    },

    pipe: {
      borderWidth: 1,
      borderColor: theme.buttonTextColor,
    },

    shapeContainer: {
      flex: 1,
      alignSelf: "flex-end",
    },
  });
};

export default getStyles;
