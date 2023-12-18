import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { getTheme } from "../tools/getTheme";

export default LoaderComponent = ({ renderWithTabBarNav }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <View style={styles.loaderContainer}>
        <View style={styles.modal}></View>
        <View style={styles.contentContainer}>
          <ActivityIndicator
            size="large"
            color={theme.primary ?? null}
            style={styles.spinner}
          />
          {renderWithTabBarNav ? <View style={{ height: 49 }}></View> : null}
        </View>
      </View>
    </>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      zIndex: 200000,
      alignItems: "center",
      justifyContent: "center",
    },

    modal: {
      backgroundColor: "#000",
      opacity: 0.1,
      width: "100%",
      zIndex: 10,
    },

    contentContainer: {
      position: "absolute",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      zIndex: 1000,
    },
  });
};
