import { useState, useMemo, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getTheme } from "../tools/getTheme";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../store/actions/AppActions";
import moment from "moment";
import Text from "./TextComponent";
import { showLoader } from "../store/actions/UtilsActions";

export default DaysComponent = () => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const days = useSelector((state) => state.app.db?.conference?.idx?.days);
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedBtn, setSelectedBtn] = useState(-1);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  useMemo(() => {
    const index = days.findIndex((d) => moment(currentDate).isSame(d));
    if (index !== -1) {
      setSelectedBtn(index);
    } else {
      setSelectedBtn(0);
    }
  }, []);

  return days ? (
    selectedBtn !== -1 ? (
      <>
        <Text stylesProp={styles.selectedDate}>
          {moment(days[selectedBtn]).format("dddd DD, MMMM YYYY")}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={styles.daysContainer}
        >
          {days.length
            ? days.map((date, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={
                      idx === selectedBtn
                        ? { ...styles.defaultButton, ...styles.selectedBtn }
                        : styles.defaultButton
                    }
                    onPress={() => {
                      setSelectedBtn(idx);
                      dispatch(setSelectedDay(date));
                    }}
                  >
                    <Text
                      stylesProp={
                        idx === selectedBtn ? styles.selectedText : styles.text
                      }
                    >
                      Day {idx + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </>
    ) : null
  ) : null;
};

const getStyles = (theme) => {
  return StyleSheet.create({
    daysContainer: { paddingVertical: 18, flexDirection: "row" },

    selectedDate: {
      fontSize: 18,
      color: theme.secondaryTitle,
    },
    defaultButton: {
      borderRadius: 20,
      paddingHorizontal: 18,
      marginRight: 25,
      paddingVertical: 8,
    },
    selectedBtn: {
      backgroundColor: theme.backgroundLight,
    },
    text: {
      color: theme.textLight,
    },
    selectedText: {
      color: theme.secondaryTitle,
    },
  });
};
