import { useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
  Modal,
} from "react-native";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./sessionDetailsScreenStyles";
import {
  MaterialIcons,
  AntDesign,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../tools/sessions";
import SVGAvatar from "../../assets/icons/avatar.svg";
import WebViewComponent from "../../components/WebViewComponent";
import RatingsComponent from "../../components/Ratings/RatingsComponent";
import Text from "../../components/TextComponent";
import * as Linking from "expo-linking";
import {
  getMySchedules,
  setMySchedule,
  countMessages,
  getRatings,
} from "../../store/actions/AppActions";
import AuthorizedScreen from "../Authorized/AuthorizedScreen";

export default SessionDetailsScreen = ({ route, navigation }) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const db = useSelector((state) => state.app.db);
  const mySchedules = useSelector((state) => state.app.mySchedules);
  const forceReload = useSelector((state) => state.app.forceReloadCounter);
  const nextCheck = useSelector((state) => state.app.nextCheck);
  const ratingAdded = useSelector((state) => state.app.ratingAdded);
  const scheduleToggled = useSelector((state) => state.app.scheduleToggled);
  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const myRate = useSelector((state) => state.app.myRate);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState([]);
  const [loader, setLoader] = useState(true);

  const session = route?.params?.session;
  const track = route?.params?.track;
  const speakers = db?.conference?.db?.lecturers;
  const reviews = new Array(5).fill(0);

  const findSessionAndDisplayRate = () => {
    const rates = db?.conference?.db?.sessions;
    if (Object.keys(rates).length > 0) {
      setRating(rates[session.id]?.rating);
    }
  };

  const onShare = async (link) => {
    try {
      const result = await Share.share({
        message: link,
        title: link,
        url: link,
      });
    } catch (error) {}
  };

  const handleGoBack = () => {
    const lastVisited = route?.params?.lastVisited;
    lastVisited
      ? navigation.navigate(lastVisited, { session, track })
      : navigation.goBack();
  };

  useEffect(() => {
    dispatch(getRatings(session.id));
  }, []);

  useEffect(() => {
    if (
      loggedInUser?.permissions_codes?.includes("VIEW_ALL_MESSAGES_ON_SESSION")
    ) {
      const polling = setTimeout(() => {
        dispatch(countMessages(session.id));
      }, nextCheck || 2000);

      return () => {
        clearTimeout(polling);
      };
    }
  }, [forceReload]);

  useEffect(() => {
    if (db?.conference?.db?.sessions) {
      findSessionAndDisplayRate();
    }
  }, [ratingAdded]);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 800);
    }
  }, [session.id]);

  useEffect(() => {
    dispatch(getMySchedules());
  }, [scheduleToggled]);

  return (
    <WrapperComponent>
      <ScrollView>
        {showModal && !registeredUser?.id ? (
          <Modal>
            <AuthorizedScreen type={"modal"} setModal={setShowModal} />
          </Modal>
        ) : showModal && registeredUser?.id ? (
          <>
            {rating.length ? (
              <RatingsComponent
                myRate={myRate}
                session={session.id}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            ) : null}
          </>
        ) : null}

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={20}
                  style={styles.goBackIcon}
                />
              </TouchableOpacity>
              {registeredUser?.id && session?.bookmarkable ? (
                <TouchableOpacity
                  onPress={() => dispatch(setMySchedule(session.id))}
                  style={styles.bookmarkBtn}
                >
                  {mySchedules.indexOf(session.id) !== -1 ? (
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
              ) : null}
            </View>
            <Text bold stylesProp={styles.title}>
              {session?.title}
            </Text>
          </View>
          {session?.rateable ? (
            <View style={styles.reviewContainer}>
              {reviews.map((r, idx) => {
                return (
                  <TouchableOpacity
                    disabled
                    key={idx}
                    style={styles.reviewIconBtn}
                  >
                    <FontAwesome
                      size={20}
                      name="star"
                      color={
                        idx + 1 > rating[0] ? "rgba(0, 0, 0, 0.1)" : "#FEC82E"
                      }
                    />
                  </TouchableOpacity>
                );
              })}
              <Text stylesProp={styles.reviewCount}>
                {rating && rating[0] > -1
                  ? `${rating[0]} (${rating[1]} reviews)`
                  : ""}
              </Text>
            </View>
          ) : null}

          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetail}>
              <Feather name="calendar" size={18} style={styles.eventIcon} />
              <Text numberOfLines={1} stylesProp={styles.eventText}>
                {moment(session?.date).format("DD MMM YYYY")}
              </Text>
            </View>
            <View style={styles.eventDetail}>
              <Feather name="clock" size={18} style={styles.eventIcon} />
              <Text numberOfLines={1} stylesProp={styles.eventText}>
                {`${moment(session.start).format("HH:mm")} - ${moment(
                  session.start
                )
                  .add(session.duration, "seconds")
                  .format("HH:mm")}`}
              </Text>
            </View>

            <View style={styles.eventDetail}>
              <Feather name="home" size={18} style={styles.eventIcon} />
              <Text numberOfLines={1} stylesProp={styles.eventText}>
                {track?.name ?? ""}
              </Text>
            </View>
          </View>

          <View style={styles.main}>
            <View style={styles.streamContainer}>
              <Text
                bold
                stylesProp={{ ...styles.mainTitle, ...styles.streamTitle }}
              >
                Stream link
              </Text>
              <TouchableOpacity
                style={styles.streamBtn}
                onPress={() => Linking.openURL(session?.stream_link)}
              >
                <Text numberOfLines={1} stylesProp={styles.streamLink}>
                  {session?.stream_link || ""}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
              <Text bold stylesProp={styles.mainTitle}>
                Description
              </Text>
              {session.description ? (
                <WebViewComponent source={session?.description} margin={20} />
              ) : (
                <Text>No description</Text>
              )}
            </View>

            <View style={styles.speakersContainer}>
              <Text
                bold
                stylesProp={{
                  ...styles.mainTitle,
                  ...styles.speakersTitle,
                }}
              >
                Speakers
              </Text>
              {session?.id_lecturers.length
                ? session.id_lecturers.map((s, idx) => {
                    const speaker = getData(speakers, s);
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("AuthorDetails", {
                            author: speaker,
                          })
                        }
                        key={idx}
                        style={styles.speaker}
                      >
                        <View style={styles.imageContainer}>
                          {speaker.profile_picture ? (
                            <Image
                              source={{ uri: speaker.profile_picture }}
                              style={styles.profilePicture}
                            />
                          ) : (
                            <SVGAvatar width={32} height={32} />
                          )}
                        </View>

                        <Text stylesProp={styles.displayName}>
                          {speaker.display_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
            {session?.can_ask_question ? (
              <View style={styles.ratingsFooter}>
                <Text bold stylesProp={styles.footerHeading}>
                  What do you think about this lecture?
                </Text>
                <Text stylesProp={styles.footerSecondaryHeading}>
                  We are interested in hearing your feedback
                </Text>
                <View style={styles.footerTop}>
                  {session?.rateable ? (
                    <TouchableOpacity
                      style={{ ...styles.actionButton, ...styles.rateBtn }}
                      onPress={() => setShowModal(true)}
                    >
                      <Text bold stylesProp={styles.btnLabel}>
                        Rate the lecture
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {session.can_share ? (
                    <TouchableOpacity
                      onPress={() =>
                        onShare(session?.share_link || "https://www.sfscon.it/")
                      }
                      style={{ ...styles.actionButton, ...styles.shareBtn }}
                    >
                      <Text bold stylesProp={styles.btnLabel}>
                        Share the lecture
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </WrapperComponent>
  );
};
