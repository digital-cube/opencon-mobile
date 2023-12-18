import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    title: {
      fontSize: 18,
      color: theme.secondaryTitle,
      marginBottom: 24,
      marginTop: 12,
      paddingHorizontal: 12,
    },

    scrollViewContainer: {
      flex: 1,
    },

    tracksContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 12,
    },

    track: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      margin: 7,
      borderRadius: 10,
    },

    trackName: {
      fontSize: 16,
    },

    defaultTrack: {
      backgroundColor: theme.inputBackground,
    },

    selectedTrack: {
      backgroundColor: "#F0F8FD",
    },

    circle: {
      borderWidth: 1,
      borderRadius: 100,
      width: 16,
      height: 16,
      marginRight: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    defaultCircle: {
      borderColor: " rgba(0, 0, 0, 0.3)",
    },

    selectedCircle: {
      borderColor: theme.secondaryTitle,
      backgroundColor: theme.secondaryTitle,
    },

    selectedText: {
      fontSize: 16,
      color: theme.secondaryTitle,
    },

    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingHorizontal: 12,
      marginTop: 12,
    },

    submitBtn: {
      alignSelf: "center",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 18,
      backgroundColor: theme.primaryButtonBackgroundColor,
      marginLeft: 25,
    },

    submitBtnTxt: {
      color: theme.primaryButtonTextColor,
    },
  });
};

export default getStyles;
