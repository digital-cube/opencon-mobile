import SVGGoogle from "../assets/icons/google.svg";
import SVGFacebook from "../assets/icons/facebook.svg";
import SVGGithub from "../assets/icons/github.svg";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default SignInButtonsComponent = ({ stylesProp }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer}>
        <SVGGoogle width={16} height={16} />
        <Text style={{ ...styles.label, ...stylesProp?.label }}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <SVGFacebook width={16} height={16} />
        <Text style={{ ...styles.label, ...stylesProp?.label }}>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <SVGGithub width={16} height={16} />
        <Text style={{ ...styles.label, ...stylesProp?.label }}>Github</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },

  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 16,
  },
});
