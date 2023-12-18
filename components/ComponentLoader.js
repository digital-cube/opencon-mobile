import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { getTheme } from "../tools/getTheme";

export default ComponentLoader = ({ renderWithTabBarNav }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={theme.primary ?? null}
          style={styles.spinner}
        />
      </View>
    </>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
