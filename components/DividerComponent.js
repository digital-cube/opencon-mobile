import { View, Text, StyleSheet, Dimensions } from "react-native";

export default DividerComponent = ({ label, stylesProp }) => {
  return (
    <View style={{ ...styles.container, ...stylesProp?.container }}>
      <View style={{ ...styles.pipe, ...stylesProp?.pipe }}></View>
      <Text style={{ ...styles.label, ...stylesProp?.label }}>
        {label || "OR"}
      </Text>
      <View style={{ ...styles.pipe, ...stylesProp?.pipe }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Dimensions.get("window").height < 700 ? 15 : 24,
  },
  pipe: {
    borderWidth: 0.3,
    height: 1,
    width: "100%",
  },
  label: {
    lineHeight: 14,
    paddingHorizontal: 8,
    textTransform: "uppercase",
  },
});
