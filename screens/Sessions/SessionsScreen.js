import { useState, useEffect, useMemo, useRef } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { getTheme } from "../../tools/getTheme";
import { getData } from "../../tools/sessions";
import getStyles from "./sessionsScreenStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import SVGAvatar from "../../assets/icons/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/TextComponent";
import { fromObjectToArray, getTimeFromDate } from "../../tools/sessions";
import { FlatList } from "react-native-gesture-handler";
import { getMySchedules, setMySchedule } from "../../store/actions/AppActions";
import EmptyScreenSVG from "../../assets/icons/empty.svg";
import ComponentLoader from "../../components/ComponentLoader";

export default SessionsComponent = () => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const store = useSelector((state) => state?.app?.db?.conference?.db);
  const selectedDay = useSelector((state) => state.app.selectedDay);
  const selectedTracks = useSelector((state) => state.app.selectedTracks);
  const mySchedules = useSelector((state) => state.app.mySchedules);
  const scheduleToggled = useSelector((state) => state.app.scheduleToggled);
  const registeredUser = useSelector((state) => state?.auth?.registeredUser);

  const navigation = useNavigation();
  const scrollRef = useRef();

  const [loader, setLoader] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [sessions, setSessions] = useState({});
  const [sessionMeasurement, setSessionMeasurement] = useState([]);
  const [hours, setHours] = useState([
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
  ]);

  const isEventFinished = (time) => {
    const currentTime = moment(new Date()).format("HH:mm");
    const timeToCheck = moment(time).format("HH:mm");
    return timeToCheck < currentTime;
  };
  const filterSession = () => {
    if (selectedTracks && selectedTracks.length) {
      const filteredSessions = Object.keys(store?.sessions)
        .filter((s) => {
          return selectedTracks.includes(store?.sessions[s]?.id_track);
        })
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: store?.sessions[key],
          });
        }, {});
      setSessions(
        fromObjectToArray(filteredSessions).filter((s) => {
          return s.date === selectedDay;
        })
      );
    } else {
      setSessions(
        fromObjectToArray(store?.sessions).filter((s) => {
          return s.date === selectedDay;
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getMySchedules());
  }, [scheduleToggled]);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 800);
    }
  }, [loader]);

  useEffect(() => {
    filterSession();
    setLoader(true);
    setTimeout(() => {
      scrollRef?.current?.scrollToOffset({ animated: false, offset: 0 });
    }, 0);
  }, [selectedTracks, selectedDay]);

  useEffect(() => {
    if (Object.keys(sessions).length > 0) {
      const filterByTime = fromObjectToArray(sessions)
        .map((s, idx) => {
          const time = getTimeFromDate(s.start);
          if (time.startsWith(selectedTime)) {
            return idx;
          }
        })
        .filter((f) => f)[0];
      setSelectedTimeIndex(filterByTime);
      setTimeout(() => {
        scrollRef?.current?.scrollToIndex({
          animated: true,
          index: selectedTimeIndex ?? 0,
        });
      }, 100);
    }
  }, [selectedTime, selectedTimeIndex]);

  if (loader) {
    return <ComponentLoader />;
  }

  return store && sessions.length ? (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => {
          scrollRef.current.scrollToIndex({
            index: 0,
            viewPosition: 0,
          });
        }}
        data={sessions}
        renderItem={({ item, index }) => {
          const track = getData(store.tracks, item.id_track);
          const room = getData(store.rooms, item.id_room);

          return (
            <View key={index} style={styles.sessionContainer}>
              <View
                style={
                  index === 0
                    ? { ...styles.timeContainer, ...styles.topRadius }
                    : styles.timeContainer
                }
              >
                <Text bold stylesProp={styles.time}>
                  {moment(item.start).format("HH:mm")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Schedule", {
                    screen: "SessionDetails",
                    params: { session: item, track },
                  })
                }
                style={styles.session}
              >
                <Text
                  bold
                  stylesProp={{
                    ...styles.headerTrack,
                    color: track.color ?? theme.secondaryTitle,
                  }}
                >
                  {track.name}
                </Text>
                <Text bold stylesProp={styles.sessionTitle}>
                  {item.title}
                </Text>
                {item.id_lecturers.length ? (
                  <View style={styles.speakers}>
                    <Text stylesProp={styles.speakersTitle}>Speakers:</Text>
                    {item.id_lecturers.map((lect, idx) => {
                      const lecturer = getData(store?.lecturers, lect);
                      return (
                        <View key={idx} style={styles.speaker}>
                          <View style={styles.imageContainer}>
                            {lecturer?.profile_picture ? (
                              <Image
                                resizeMode="cover"
                                source={{ uri: lecturer?.profile_picture }}
                                style={styles.profilePicture}
                              />
                            ) : (
                              <SVGAvatar />
                            )}
                          </View>
                          <View style={styles.speakerInfo}>
                            <Text stylesProp={styles.speakerName}>
                              {lecturer.display_name}
                            </Text>
                            <Text stylesProp={styles.speakerSession}></Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
                <View style={styles.trackContainer}>
                  <Feather name="home" size={15} color={track.color} />
                  <Text
                    stylesProp={{ ...styles.trackName, color: track.color }}
                  >
                    {room.name}
                  </Text>
                  {registeredUser?.id ? (
                    <>
                      {item.bookmarkable ? (
                        <View style={styles.bookmark}>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(setMySchedule(item.id));
                            }}
                            style={styles.bookmarkBtn}
                          >
                            {mySchedules.indexOf(item.id) !== -1 ? (
                              <Ionicons
                                name="bookmark"
                                size={18}
                                style={styles.bookmarkIcon}
                              />
                            ) : (
                              <Ionicons
                                name="bookmark-outline"
                                size={18}
                                style={styles.bookmarkIconSelected}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  ) : (
    <View style={styles.emptyContainer}>
      <EmptyScreenSVG />
      <Text stylesProp={styles.emptyText}>
        There are no lectures for this day according to the selected filters
      </Text>
    </View>
  );
};
