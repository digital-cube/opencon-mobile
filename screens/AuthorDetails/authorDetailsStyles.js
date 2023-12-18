import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      flex: 1,
      paddingHorizontal: 20,
    },

    header: {
      marginTop: 30,
      marginBottom: 24,
    },

    authorTop: {
      flexDirection: "row",
      alignItems: "center",
    },

    authorDetails: {
      flex: 1,
      marginLeft: 12,
    },

    authorImage: {
      width: 70,
      height: 70,
      borderRadius: 100,
    },

    authorName: {
      color: theme.title,
      fontSize: 26,
    },

    authorEmail: {
      color: theme.secondaryTitle,
    },

    authorBio: {
      marginBottom: 32,
      flex: 1,
    },

    bio: {
      fontSize: 15,
      color: theme.textMedium,
    },

    sectionTitle: {
      marginTop: 45,

      fontSize: 18,
      fontWeight: "600",
      marginBottom: 20,
    },

    socials: {
      flexDirection: "row",
    },

    iconBtn: {
      marginRight: 25,
      marginTop: 10,
    },

    socialsIcon: {
      color: theme.inputTextColor,
    },

    footer: {
      alignItems: "flex-start",
    },

    shareAuthorBtn: {
      backgroundColor: theme.primaryButtonBackgroundColor,
      marginTop: 32,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },

    shareAuthorBtnText: {
      color: theme.primaryButtonTextColor,
    },
  });
};

export default getStyles;
