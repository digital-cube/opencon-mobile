import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    header: {
      marginTop: 20,
    },

    headerTop: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },

    bookmarkButton: {
      paddingHorizontal: 5,
      paddingVertical: 5,
    },

    bookmarkIcon: {
      color: theme.ratingSelected,
    },

    title: {
      color: theme.title,
      fontWeight: "600",
      fontSize: 26,
      marginTop: 14,
    },

    reviewContainer: {
      flexDirection: "row",
      marginTop: 25,
    },

    reviewIconBtn: {
      marginRight: 6,
    },

    reviewCount: {
      color: theme.textLight,
    },

    eventDetailsContainer: {
      marginTop: 35,
    },

    eventDetail: {
      flexDirection: "row",
      marginBottom: 20,
    },

    eventText: {
      marginLeft: 8,
      color: theme.textMedium,
      maxWidth: "90%",
    },

    eventIcon: {
      color: theme.primary,
    },

    mainTitle: {
      fontSize: 18,
      marginTop: 30,
      marginBottom: 10,
      fontWeight: "600",
    },

    streamTitle: {
      marginBottom: 0,
    },

    streamBtn: {
      paddingVertical: 10,
    },

    streamLink: {
      color: theme.primary,
    },

    description: {
      color: theme.textMedium,
      marginTop: 12,
    },

    speakersContainer: {
      marginBottom: 40,
    },

    speaker: {
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    speakersTitle: {
      marginBottom: 14,
    },

    imageContainer: {
      backgroundColor: theme.avatarContainer,
      borderRadius: 100,
      alignSelf: "center",
    },

    profilePicture: {
      width: 32,
      height: 32,
      borderRadius: 100,
    },

    displayName: {
      fontSize: 15,
      color: theme.textMedium,
      marginLeft: 12,
    },

    footerHeading: {
      color: theme.title,
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 7,
    },

    footerTop: {
      flexDirection: "row",
    },

    actionButton: {
      backgroundColor: theme.primaryButtonBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: "center",
      marginTop: 30,
      borderRadius: 20,
    },

    rateBtn: {
      marginRight: 24,
    },

    btnLabel: {
      color: theme.primaryButtonTextColor,
    },

    askAQuestionBtnLabel: {
      color: theme.secondaryButtonTextColor,
    },

    askQuestionBtn: {
      alignSelf: "flex-start",
      backgroundColor: theme.secondaryButtonBackgroundColor,
    },

    questions: {
      marginTop: 30,
      alignItems: "flex-start",
    },

    questionsHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },

    questionsTitle: {
      fontSize: 18,
      marginRight: 5,
    },

    numOfQuestions: {
      fontSize: 18,
      color: theme.textLight,
    },

    question: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16,
    },

    avatar: {
      backgroundColor: theme.avatarContainer,
      borderRadius: 100,
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
    },

    myQuestionAvatar: {
      backgroundColor: "rgba(115, 196, 239, 0.05)",
    },

    questionInfo: {
      marginLeft: 7,
      flex: 1,
    },

    infoTop: {
      flexDirection: "row",
      alignItems: "flex-end",
    },

    name: {
      fontSize: 12,
      color: theme.textDark,
    },

    myName: {
      color: theme.secondaryTitle,
    },

    timePosted: {
      fontSize: 9,
      marginHorizontal: 5,
      color: "rgba(0, 0, 0, 0.4)",
    },

    myTimePosted: {
      color: theme.secondaryTitle,
    },

    likeIconBtn: {
      bottom: 1,
      flexDirection: "row",
      alignItems: "flex-end",
      paddingTop: 5,
    },

    likeIconDefault: {
      color: "rgba(0, 0, 0, 0.4)",
    },

    myLikeIcon: {
      color: theme.secondaryTitle,
    },

    likeIconSelected: {
      color: theme.primary,
    },

    numberOfLikes: {
      fontSize: 10,
      marginLeft: 3,
      color: theme.secondaryTitle,
      bottom: -1,
    },

    deleteIconBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      flex: 1,
    },

    deleteIcon: {
      top: 1,
      color: theme.secondaryTitle,
    },

    deleteText: {
      color: theme.secondaryTitle,
      fontSize: 10,
      marginLeft: 2,
      top: 1,
    },

    questionDescription: {
      color: theme.textMedium,
      fontSize: 15,
      marginTop: 4,
    },

    myQuestionDescription: {
      color: theme.secondaryTitle,
    },
  });
};

export default getStyles;
