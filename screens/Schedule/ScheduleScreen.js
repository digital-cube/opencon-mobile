import React, { useState, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import getStyles from "./scheduleScreenStyles";
import { getTheme } from "../../tools/getTheme";
import { useDispatch, useSelector } from "react-redux";
import DaysComponent from "../../components/DaysComponent";
import SessionsComponent from "../Sessions/SessionsScreen";
import { AntDesign } from "@expo/vector-icons";
import SecondaryButtonComponent from "../../components/UI/SecondaryButtonComponent";
import LoaderComponent from "../../components/AppLoader";
import TracksComponent from "../../components/Tracks/TracksComponent";
import Text from "../../components/TextComponent";
import FilterActiveSVG from "../../assets/filter_active.svg";
import FilterDefaultSVG from "../../assets/filter_default.svg";
import { setSelectedTracks } from "../../store/actions/AppActions";

export default ScheduleScreen = ({ navigation }) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [showModal, setShowModal] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const store = useSelector((state) => state?.app?.db?.conference?.db);
  const selectedTracks = useSelector((state) => state?.app?.selectedTracks);
  const [sessions, setSessions] = useState(store?.sessions);
  const [clearFilters, setClearFilters] = useState(false);

  const activeFiltersLabel = selectedTracks?.length > 1 ? "filters" : "filter";

  return !store ? (
    <LoaderComponent />
  ) : (
    <WrapperComponent>
      <>
        <TracksComponent
          clearFiltersFlag={clearFilters}
          showModal={showTracks}
          setShowModal={setShowTracks}
        />
        <View style={styles.header}>
          <Text bold stylesProp={styles.headerTitle}>
            Schedule
          </Text>
          <DaysComponent />
          <View style={styles.filterContainer}>
            <Text stylesProp={styles.filterTitle}>Tracks</Text>

            <View style={styles.filtersHolder}>
              {!selectedTracks.length ? (
                <SecondaryButtonComponent
                  handlePress={() => {
                    setShowTracks(true);
                    setClearFilters(false);
                  }}
                  stylesProp={{
                    button: styles.filter,
                    label: styles.selectedFilter,
                  }}
                  label={"Filter"}
                >
                  <FilterDefaultSVG />
                </SecondaryButtonComponent>
              ) : (
                <>
                  <View style={styles.activeFiltersHolder}>
                    <Text stylesProp={styles.numberOfActiveFilters}>
                      {`${
                        selectedTracks?.length - 1
                      } ${activeFiltersLabel} selected`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setSelectedTracks([]));
                        setClearFilters(true);
                      }}
                    >
                      <AntDesign
                        name="close"
                        size={20}
                        style={styles.closeIcon}
                        color={theme.primaryButtonTextColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setShowTracks(true)}>
                    <FilterActiveSVG />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
        <SessionsComponent sessions={sessions} store={store} />
      </>
    </WrapperComponent>
  );
};
