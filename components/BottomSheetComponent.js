import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Dimensions } from "react-native";

export default BottomSheetComponent = ({ index, setIndex, children }) => {
  const bottomSheetRef = useRef();
  const minSnapPoint = Dimensions.get("window").height < 670 ? "55%" : "45%";
  const snapPoints = useMemo(() => [minSnapPoint, minSnapPoint], []);
  const [height, setHeight] = useState(24);

  const closeModal = () => {
    setIndex(-1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={closeModal}
      keyboardBehavior="interactive"
    >
      {children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
