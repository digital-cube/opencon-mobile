import { Text } from "react-native";
import { useFonts } from "expo-font";

export default TextComponent = ({
  children,
  stylesProp,
  bold,
  numberOfLines,
}) => {
  let [fontsLoaded] = useFonts({
    SourceSansRegular: require("../assets/fonts/SourceSansPro-Regular.ttf"),
    SourceSansBold: require("../assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontFamily: bold ? "SourceSansBold" : "SourceSansRegular",
        ...stylesProp,
      }}
    >
      {children}
    </Text>
  );
};
