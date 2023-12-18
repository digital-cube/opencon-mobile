import { View, StyleSheet, Dimensions } from "react-native";
import SVGShape from "../assets/icons/shape.svg";

export default ShapeSVG = () => {
  return (
    <View style={styles.svgContainer}>
      <SVGShape />
    </View>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: "absolute",
    width: "100%",
    height: "32%",
    alignItems: "flex-start",
    bottom: 0,
    zIndex: -1,
    borderColor: "red",
  },
});
