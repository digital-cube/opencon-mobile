import { useState, useMemo, useEffect } from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./tracksComponentStyles";
import { Feather } from "@expo/vector-icons";
import SecondaryButtonComponent from "../UI/SecondaryButtonComponent";
import Text from "../TextComponent";
import { fromObjectToArray } from "../../tools/sessions";
import { setSelectedTracks as setTracksInStore } from "../../store/actions/AppActions";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default TracksComponent = ({
  showModal,
  setShowModal,
  clearFiltersFlag,
}) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const tracks = useSelector((state) => state?.app?.db?.conference?.db?.tracks);

  const sfsConId = "SFSCON";

  const [selectedTracks, setSelectedTracks] = useState([]);
  const [previouslySelectedTracks, setPreviouslySelectedTracks] =
    useState(selectedTracks);

  const [defaultFilter, setDefaultFilter] = useState(null);

  const insets = useSafeAreaInsets();

  useMemo(() => {
    const filters = fromObjectToArray(tracks);
    const findFilter = filters?.find((f) => f?.name === sfsConId);
    if (findFilter !== -1) {
      setDefaultFilter(findFilter?.id);
    }
  }, []);

  useEffect(() => {
    if (clearFiltersFlag) {
      setSelectedTracks([]);
      setPreviouslySelectedTracks([]);
    }
  }, [clearFiltersFlag]);

  const checkIfAlreadyInArray = (id) => {
    let index = selectedTracks.indexOf(id);
    if (index !== -1) {
      setSelectedTracks(selectedTracks.filter((s) => s !== id));
    } else {
      setSelectedTracks((prev) => [...prev, id]);
    }
  };
  return (
    <Modal
      style={styles.modal}
      visible={showModal}
      // transparent={true}
      animationType={"fade"}
    >
      <View
        style={{
          ...styles.container,
          paddingTop: insets?.top > 0 ? insets?.top : 20,
          paddingBottom: insets?.bottom || 20,
        }}
      >
        <Text bold stylesProp={styles.title}>
          Tracks
        </Text>
        <View style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={styles.tracksContainer}>
            {Object.keys(tracks).length > 0
              ? fromObjectToArray(tracks)
                  .filter((f) => {
                    return f.name !== sfsConId;
                  })
                  .map((t, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={() => checkIfAlreadyInArray(t.id)}
                        style={
                          selectedTracks.indexOf(t.id) === -1
                            ? { ...styles.track, ...styles.defaultTrack }
                            : { ...styles.track, ...styles.selectedTrack }
                        }
                        key={idx}
                      >
                        <View
                          style={
                            selectedTracks.indexOf(t.id) !== -1
                              ? { ...styles.circle, ...styles.selectedCircle }
                              : { ...styles.circle, ...styles.defaultCircle }
                          }
                        >
                          {selectedTracks.indexOf(t.id) !== -1 ? (
                            <Feather name="check" size={8} color="#FFF" />
                          ) : null}
                        </View>
                        <Text
                          stylesProp={
                            selectedTracks.indexOf(t.id) !== -1
                              ? { ...styles.selectedText, ...styles.trackName }
                              : styles.trackName
                          }
                        >
                          {t.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
              : null}
          </ScrollView>
        </View>

        <View style={styles.actionsContainer}>
          <SecondaryButtonComponent
            label={"Cancel"}
            handlePress={() => {
              if (previouslySelectedTracks.length) {
                setSelectedTracks(previouslySelectedTracks);
              } else {
                setSelectedTracks([]);
              }
              setShowModal(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(setTracksInStore(selectedTracks, defaultFilter));
              setPreviouslySelectedTracks(selectedTracks);
              setShowModal(false);
            }}
            style={styles.submitBtn}
          >
            <Text stylesProp={styles.submitBtnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
