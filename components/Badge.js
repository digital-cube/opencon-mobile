import React, { useMemo } from "react";
import Text from "./TextComponent";
import { View, StyleSheet } from "react-native";
import { getTheme } from "../tools/getTheme";

export default Badge = ({ number }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.badge}>
      <Text stylesProp={styles.badgeNumber}>{number}</Text>
    </View>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    badge: {
      backgroundColor: theme.inputBackgroundDarker,
      borderRadius: 100,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: 8,
      top: -15,
      zIndex: 20,
    },

    badgeNumber: {
      fontSize: 14,
      color: "#FFF",
    },
  });
};
