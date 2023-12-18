import { useState, useMemo, useEffect } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./ratingsComponentsStyles";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../TextComponent";
import SecondaryButtonComponent from "../UI/SecondaryButtonComponent";
import { postRatings, getRatings } from "../../store/actions/AppActions";

export default RatingsComponent = ({
  session,
  myRate,
  showModal,
  setShowModal,
}) => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [ratingStars, setRatingStars] = useState([0, 0, 0, 0, 0]);
  const [loader, setLoader] = useState(false);
  const [ratingMessage, setRatingMessage] = useState([
    "Poor",
    "Fair",
    "Good",
    "Very good",
    "Excellent",
  ]);
  const [selectedRatingIndex, setSelectedRatingIndex] = useState(-1);

  useEffect(() => {
    if (myRate) {
      setSelectedRatingIndex(myRate - 1);
    }
  }, [session, myRate]);

  return (
    <Modal
      style={styles.modal}
      visible={showModal}
      transparent={true}
      animationType={"fade"}
    >
      <View style={{ ...styles.container }}>
        <View style={styles.content}>
          <Text bold stylesProp={styles.title}>
            What do you think about this lecture?
          </Text>
          <Text stylesProp={styles.secondaryTitle}>
            We are interested in hearing your feedback
          </Text>
          <Text stylesProp={styles.answer}>
            {ratingMessage[selectedRatingIndex]}
          </Text>

          <View style={styles.ratingStarsContainer}>
            {ratingStars.map((rating, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedRatingIndex(idx)}
                  key={idx}
                  style={styles.ratingStar}
                >
                  <FontAwesome
                    name={"star"}
                    size={30}
                    color={
                      idx > selectedRatingIndex
                        ? theme?.ratingDefault
                        : theme?.ratingSelected
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.actionsContainer}>
            <SecondaryButtonComponent
              label={"Skip"}
              handlePress={() => {
                setShowModal(false);
              }}
            />
            <TouchableOpacity
              disabled={selectedRatingIndex === -1}
              onPress={() => {
                dispatch(postRatings(session, selectedRatingIndex + 1));
                setShowModal(false);
              }}
              style={
                selectedRatingIndex !== -1
                  ? { ...styles.submitBtn, ...styles.submitBtnAllowed }
                  : { ...styles.submitBtn, ...styles.disabledBtn }
              }
            >
              <Text
                stylesProp={
                  selectedRatingIndex !== -1
                    ? styles.submitBtnTxtAllowed
                    : styles.disabledBtnTxt
                }
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
