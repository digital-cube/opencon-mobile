import { useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { getTheme } from "../../tools/getTheme";
import Text from "../TextComponent";

export default ButtonComponent = ({
  label,
  stylesProp,
  handlePress,
  disabled,
  children,
  loading = false,
}) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ ...styles.button, ...stylesProp?.button }}
      onPress={handlePress}
    >
      {loading ? (
        <ActivityIndicator
          size={"small"}
          color={theme?.primaryButtonTextColor}
        />
      ) : (
        <Text bold stylesProp={{ ...styles.label, ...stylesProp?.label }}>
          {label}
        </Text>
      )}

      {children}
    </TouchableOpacity>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    button: {
      padding: 14,
      borderRadius: 30,
      width: "100%",
      backgroundColor: theme.primaryButtonBackgroundColor,
    },
    label: {
      fontWeight: "600",
      fontSize: 16,
      textAlign: "center",
      color: theme.primaryButtonTextColor,
    },
  });
};
