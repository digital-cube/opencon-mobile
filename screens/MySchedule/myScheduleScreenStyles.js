import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      padding: 20,
    },

    title: {
      fontSize: 26,
    },

    scollViewContainer: {
      flex: 1,
      justifyContent: "center",
    },

    emptyContainer: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },

    emptyText: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },

    mySchedulesContainer: {
      paddingHorizontal: 20,
    },

    session: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      paddingBottom: 20,
    },

    sessionTitle: {
      fontSize: 16,
      marginVertical: 20,
    },

    sessionDetails: {
      flexDirection: "row",
      marginBottom: 20,
    },

    timeContainer: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: "#F0F8FD",
      marginRight: 15,
      padding: 10,
      borderRadius: 30,
    },

    roomContainer: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: "#F0F8FD",
      padding: 8,
      borderRadius: 30,
    },

    clock: {
      color: theme.secondaryTitle,
    },

    time: {
      color: theme.secondaryTitle,
      marginLeft: 4,
      fontSize: 15,
    },

    homeIcon: {
      color: theme.secondaryTitle,
      marginRight: 4,
    },

    roomName: {
      color: theme.secondaryTitle,
      fontSize: 15,
    },

    speakersTitle: {
      marginBottom: 6,
      fontSize: 12,
      color: theme.textMedium,
    },

    speaker: {
      color: theme.text,
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
