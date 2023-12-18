import { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import Text from "./TextComponent";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default ToasterComponent = ({ visibilityTime, type }) => {
  const toast = useSelector((state) => state.utils.toast);
  const insets = useSafeAreaInsets();

  const config = {
    errorToast: ({ text1, text2 }) => {
      <View style={{ width: "100%", backgroundColor: "tomato" }}>
        <Text stylesProp={styles.type}>{text1}</Text>
        <Text stylesProp={styles.message}>{text2}</Text>
      </View>;
    },
  };

  useEffect(() => {
    if (toast?.message) {
      Toast.show({
        visibilityTime: 3000,
        position: "top",
        topOffset: insets?.top,
        type: toast?.type ?? "info",
        text1: toast?.type === "error" ? "Error" : "Info",
        text2: toast?.message,
      });
    }
  }, [toast]);

  return (
    <>
      <Toast
        config={config}
        position="top"
        visibilityTime={visibilityTime || 2000}
        type={type || "info"}
      />
    </>
  );
};

const getStyles = () => {};
