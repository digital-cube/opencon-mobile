import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },
    sessionContainer: {
      flex: 1,
      flexDirection: "row",
    },

    main: {
      paddingHorizontal: 20,
    },

    emptyContainer: {
      width: "80%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },

    emptyText: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },

    timeContainer: {
      backgroundColor: theme.inputBackground,
      flexBasis: "20%",
      paddingTop: 16,
      paddingHorizontal: 8,
      alignItems: "center",
      justifyContent: "flex-start",
    },

    time: {
      fontWeight: "600",
      color: theme.title,
    },

    stillActiveTime: {
      color: theme.secondaryTitle,
    },

    topRadius: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    session: {
      backgroundColor: theme.inputBackground,
      flexBasis: "76%",
      marginBottom: 15,
      borderRadius: 10,
      marginLeft: 8,
      paddingVertical: 15,
      paddingHorizontal: 8,
    },

    headerTrack: {
      fontSize: 12,
      marginBottom: 7,
      fontWeight: "600",
    },

    sessionTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 24,
    },

    trackContainer: {
      paddingVertical: 6,
      flexDirection: "row",
      alignItems: "center",
    },

    trackName: {
      marginLeft: 5,
    },

    speakers: {},

    speaker: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },

    speakersTitle: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 7,
    },

    imageContainer: {
      width: 32,
      height: 32,
      borderRadius: 100,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.inputBackground,
    },

    profilePicture: {
      width: "100%",
      height: "100%",
    },

    speakerInfo: {
      marginLeft: 6,
      flexDirection: "row",
    },

    speakerName: {
      fontSize: 12,
      color: theme.title,
    },

    timelapseText: {
      color: theme.secondaryButtonTextColor,
    },

    bookmark: {
      flex: 1,
      alignItems: "flex-end",
      marginRight: 5,
    },

    bookmarkBtn: {
      padding: 10,
    },

    bookmarkIcon: {
      color: theme.ratingSelected,
    },

    bookmarkIconSelected: {
      color: theme.textMedium,
    },
  });
};

export default getStyles;
