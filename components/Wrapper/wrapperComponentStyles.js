import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    iosWrapper: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },

    androidWrapper: {
      flex: 1,
      paddingTop: 25,
      backgroundColor: theme.backgroundColor,
    },
  });
};

export default getStyles;
