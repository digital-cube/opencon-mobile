import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import getStyles from "./headerComponentStyles";
import { getTheme } from "../../tools/getTheme";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../TextComponent";

export default HeaderComponent = ({
  handleGoBack,
  title,
  secondaryTitle,
  stylesProp,
  renderWithButton,
}) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <View style={{ ...styles.header, ...stylesProp?.header }}>
        <View style={styles.titleContainer}>
          {renderWithButton ? (
            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <MaterialIcons
                name="arrow-back-ios"
                size={20}
                style={styles.goBackIcon}
              />
            </TouchableOpacity>
          ) : null}

          <Text
            bold
            stylesProp={
              renderWithButton
                ? { ...styles.mainTitle, marginLeft: 25 }
                : styles.mainTitle
            }
          >
            {title}
          </Text>
        </View>
        <Text
          stylesProp={
            renderWithButton
              ? { ...styles.mainSecondaryTitle, marginLeft: 25 }
              : styles.mainSecondaryTitle
          }
        >
          {secondaryTitle}
        </Text>
      </View>
    </>
  );
};
