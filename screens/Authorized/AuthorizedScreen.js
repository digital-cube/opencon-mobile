import { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, Platform } from "react-native";
import ButtonComponent from "../../components/UI/ButtonComponent";
import InputComponent from "../../components/UI/InputComponent";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  resetError,
  registerPretixUser,
} from "../../store/actions/AuthActions";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./authorizedScreenStyles";
import { useIsFocused } from "@react-navigation/native";
import { usePushNotifications } from "../../notifications/usePushNotifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default AuthorizedScreen = ({ setModal, type = null }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { expoPushToken } = usePushNotifications();

  const inputRef = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [pretixCode, setPretixCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const regError = useSelector((state) => state.auth.regError);
  const registeredUser = useSelector((state) => state.auth.registeredUser);

  useEffect(() => {
    if (isFocused) {
      setDisabled(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (type === "modal" && registeredUser?.id) {
      setModal(false);
    }
  }, [registeredUser]);

  useEffect(() => {
    if (regError) {
      setLoading(false);
      setDisabled(false);
      dispatch(resetError());
    }
  }, [regError]);

  return (
    <WrapperComponent>
      <View style={styles.container}>
        <Text style={styles.message}>
          In order to use this feature please enter your SFSCON ticket code
          (Pretix)
        </Text>

        <InputComponent
          ref={inputRef}
          label={"SFSCON ticket code (Pretix) (ex. GRY7A)"}
          handleChange={(val) => setPretixCode(val)}
          value={pretixCode}
        />

        <ButtonComponent
          disabled={disabled}
          loading={loading}
          handlePress={() =>
            dispatch(registerPretixUser(pretixCode, expoPushToken, Platform.OS))
          }
          label={"Confirm"}
        />

        {type === "modal" && (
          <ButtonComponent
            disabled={disabled}
            loading={loading}
            handlePress={() => setModal(false)}
            label={"Cancel"}
            stylesProp={{
              button: { ...styles.button, ...styles.secondaryButton },
              label: { ...styles.label, ...styles.secondaryLabel },
            }}
          />
        )}
      </View>
    </WrapperComponent>
  );
};
