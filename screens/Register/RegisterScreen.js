import React, { useState, useEffect, useRef, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../../components/UI/InputComponent";
import ButtonComponent from "../../components/UI/ButtonComponent";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import LogoComponent from "../../components/LogoComponent";
import getStyles from "./registerScreenStyles";
import { getTheme } from "../../tools/getTheme";
import {
  registerPretixUser as register,
  resetError,
} from "../../store/actions/AuthActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ShapeComponent from "../../components/ShapeComponent";
import { useForm, Controller } from "react-hook-form";
import { useIsFocused } from "@react-navigation/native";
import Text from "../../components/TextComponent";
import AppVersionComponent from "../../components/AppVersion/AppVersionComponent";

export default RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const isFocused = useIsFocused();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const regError = useSelector((state) => state.auth.regError);
  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const inputRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isFocused) {
      setDisabled(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (registeredUser?.token) {
      navigation.navigate("App", { screen: "Schedule" });
    }
  }, [registeredUser]);

  useEffect(() => {
    if (regError) {
      setLoading(false);
      setDisabled(false);
      dispatch(resetError());
    }
  }, [regError]);

  const registerUser = (data) => {
    const { pretixCode } = data;
    if (Object.keys(errors).length < 1) {
      dispatch(register(pretixCode));
      setLoading(true);
      setDisabled(true);
    }
  };

  return (
    <WrapperComponent>
      <>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <LogoComponent />
            <Text bold stylesProp={styles.titleHeading}>
              Welcome to the SFScon
            </Text>
            <Text bold stylesProp={styles.titleText}>
              access your account from here
            </Text>
          </View>

          <View style={styles.main}>
            <Controller
              control={control}
              name="pretixCode"
              render={({ field: { onChange, value, onBlur } }) => (
                <InputComponent
                  error={errors?.pretixCode}
                  errorMessage={errors?.pretixCode?.message ?? ""}
                  ref={inputRef}
                  label={"Login with pretix"}
                  value={value}
                  handleChange={(val) => {
                    onChange(val);
                  }}
                  handleBlur={onBlur}
                  stylesProp={{ input: styles.input, label: styles.label }}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
            />

            <ButtonComponent
              disabled={disabled}
              loading={loading}
              handlePress={handleSubmit(registerUser)}
              label={"Continue"}
              stylesProp={{
                button: styles.continueBtn,
                label: styles.continueBtnLabel,
              }}
            />
          </View>
          <View style={styles.footer}></View>
        </KeyboardAwareScrollView>
        <AppVersionComponent />
        <ShapeComponent />
      </>
    </WrapperComponent>
  );
};
