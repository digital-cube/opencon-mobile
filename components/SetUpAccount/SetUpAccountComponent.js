import { useState, useEffect, useMemo } from "react";
import { View, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./setUpAccountComponentStyles";
import InputComponent from "../UI/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/UI/ButtonComponent";
import {
  setUpUserAccount,
  showLoader,
  deleteAccountOnSetup,
} from "../../store/actions/AuthActions";
import Text from "../TextComponent";
import { useForm, Controller } from "react-hook-form";
import { storageGetItem } from "../../tools/secureStore";
import SecondaryButtonComponent from "../UI/SecondaryButtonComponent";

export default SetupAccountComponent = () => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const [showModal, setShowModal] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 60 : 0;

  useEffect(() => {
    if (!loggedInUser?.have_password && loggedInUser?.role !== "guest") {
      setShowModal(true);
    }
  }, [loggedInUser?.have_password]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const confirm = () => {
    const objToSend = {
      password: getValues().password,
      firstName: getValues().firstName,
      companyName: getValues().companyName,
      lastName: getValues().lastName,
    };

    if (Object.keys(errors).length < 1) {
      dispatch(setUpUserAccount(objToSend, setShowModal));
    }
  };

  return (
    <Modal
      visible={showModal}
      style={styles.modalContainer}
      transparent={true}
      animationType={"fade"}
    >
      <View style={{ ...styles.modal }}>
        <KeyboardAwareScrollView
          extraScrollHeight={0}
          scrollEnabled={false}
          extraHeight={Platform.OS == "ios" ? 120 : 0}
          contentContainerStyle={styles.scrollView}
        >
          <View style={{ ...styles.modalContent }}>
            <View style={styles.form}>
              <Text bold stylesProp={styles.modalTitle}>
                Set up your account
              </Text>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    error={errors?.password}
                    errorMessage={errors?.password?.message ?? ""}
                    handleChange={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    type={"password"}
                    label={"Password*"}
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

              <Controller
                control={control}
                name="companyName"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    error={errors?.companyName}
                    errorMessage={errors?.companyName?.message}
                    handleChange={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    label={"Organization"}
                    stylesProp={{ input: styles.input, label: styles.label }}
                  />
                )}
              />

              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    error={errors?.firstName}
                    errorMessage={errors?.firstName?.message ?? ""}
                    handleChange={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    label={"First name*"}
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

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputComponent
                    error={errors?.lastName}
                    errorMessage={errors?.lastName?.message ?? ""}
                    handleChange={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    label={"Last name*"}
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
              <View style={styles.actionsContainer}>
                <SecondaryButtonComponent
                  label={"Cancel"}
                  handlePress={() => {
                    dispatch(deleteAccountOnSetup());
                    setShowModal(false);
                  }}
                />
                <ButtonComponent
                  handlePress={handleSubmit(confirm)}
                  label={"Confirm"}
                  stylesProp={{
                    button: styles.confirmBtn,
                    label: styles.confirmBtnLabel,
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};
