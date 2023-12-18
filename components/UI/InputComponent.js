import { forwardRef, useState, useMemo } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { getTheme } from "../../tools/getTheme";
import { AntDesign, Feather } from "@expo/vector-icons";
import Text from "../TextComponent";

export default InputComponent = forwardRef((props, ref) => {
  const {
    value,
    placeholder,
    label,
    stylesProp,
    handleChange,
    error,
    errorMessage,
    type,
    editable,
    handleBlur,
    multiline,
    maxLength,
  } = props;
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{ ...styles.wrapper, ...stylesProp?.wrapper }}>
      <Text stylesProp={{ ...styles.label, ...stylesProp?.label }}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          maxLength={maxLength}
          multiline={multiline}
          ref={ref}
          editable={editable}
          secureTextEntry={type === "password" ? showPassword : false}
          onChangeText={handleChange}
          onBlur={handleBlur}
          numberOfLines={1}
          value={value}
          placeholder={placeholder}
          style={
            error
              ? { ...styles.input, ...styles.errorInput, ...stylesProp?.input }
              : { ...styles.input, ...stylesProp?.input }
          }
        />
        {type === "password" ? (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleShowPassword}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <View style={styles.errorMessageContainer}>
          <AntDesign
            name="exclamationcircleo"
            size={10}
            style={styles.errorMessageIcon}
          />
          <Text stylesProp={styles.errorMessage} numberOfLines={1}>
            {errorMessage}
          </Text>
        </View>
      ) : null}
    </View>
  );
});

const getStyles = (theme) => {
  return StyleSheet.create({
    wrapper: {
      width: "100%",
      marginBottom: 15,
    },
    label: {
      marginBottom: 6,
      color: theme.text,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    input: {
      width: "100%",
      height: 44,
      borderRadius: 5,
      paddingHorizontal: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.inputBackground,
      backgroundColor: theme.inputBackground,
      color: theme.inputTextColor,
    },

    eyeIconContainer: {
      position: "absolute",
      right: 0,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },

    eyeIcon: {
      color: theme.text,
    },

    errorInput: {
      borderWidth: 1,
      borderColor: theme.inputErrorBorderColor,
    },

    errorMessageIcon: {
      color: theme.inputErrorMessage,
    },

    errorMessageContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    errorMessage: {
      color: theme.inputErrorMessage,
      marginLeft: 5,
    },
  });
};
