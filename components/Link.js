import React, { useMemo } from "react";
import Text from "./TextComponent";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { getTheme } from "../tools/getTheme";
import { Linking } from "react-native";

export default LinkComponent = ({
  link = "",
  label = "",
  placeholder = "",
}) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.link}>
      <Text
        numberOfLines={1}
        stylesProp={{ ...styles.text, ...styles.textLabel }}
      >{`${label} `}</Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL(link)}
      >
        <Text
          numberOfLines={1}
          stylesProp={{ ...styles.text, ...styles.linkText }}
        >
          {placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    link: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 16,
    },

    text: {
      fontSize: 16,
      marginRight: 6,
      color: theme.text,
    },

    linkText: {
      color: theme?.primary,
    },
  });
};
