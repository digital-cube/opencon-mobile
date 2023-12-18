import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default TimelapseComponent = ({
  stylesProp,
  selectedTime,
  hours,
  setHours,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {hours.map((t, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={
              t === selectedTime
                ? { ...styles.btn, ...styles.selectedBtn }
                : styles.btn
            }
            onPress={() => {
              setHours(t);
            }}
          >
            <Text
              style={{ ...stylesProp?.text, ...styles.text }}
            >{`${t}h`}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    right: 2,
  },

  btn: {
    marginBottom: 40,
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
  },

  selectedBtn: {
    backgroundColor: "rgba(140, 202, 237, 0.13)",
  },

  text: {
    fontSize: 10,
  },
});
