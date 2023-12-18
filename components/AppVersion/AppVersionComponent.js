import { useMemo } from "react";
import { View, Text } from "react-native";
import getStyles from "./appVersionComponentStyles";
import { useSelector } from "react-redux";
import { server } from "../../constants/api";
import {
  BUILD_VERSION,
  BUILD_DATE,
  APP_VERSION,
} from "../../constants/buildVersion";
import Constants from "expo-constants";
import { getTheme } from "../../tools/getTheme";

export default AppVersion = () => {
  const theme = getTheme();

  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.appVersion}>
      <Text style={styles.appVersionText}>{`Server: ${server}`}</Text>
      <Text
        style={styles.appVersionText}
      >{`Version: ${Constants?.expoConfig?.version}`}</Text>
      <Text style={styles.appVersionText}>{BUILD_VERSION}</Text>
      <Text style={styles.appVersionText}>{BUILD_DATE}</Text>
    </View>
  );
};
