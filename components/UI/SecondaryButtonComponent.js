import { useMemo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { getTheme } from "../../tools/getTheme";
import Text from "../TextComponent";

export default ButtonComponent = ({
  label,
  stylesProp,
  handlePress,
  disabled,
  children,
}) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ ...styles.button, ...stylesProp?.button }}
      onPress={handlePress}
    >
      <Text stylesProp={{ ...styles.label, ...stylesProp?.label }}>
        {label}
      </Text>
      {children}
    </TouchableOpacity>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    button: {
      marginLeft: 2,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.secondaryButtonTextColor,
    },
  });
};
