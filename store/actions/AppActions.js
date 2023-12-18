import {
  SET_THEME,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAIL,
  SET_SELECTED_DAY,
  SET_SELECTED_TRACKS,
  TOGGLE_MY_SCHEDULE,
  GET_MY_SCHEDULE_SUCCESS,
  GET_MY_SCHEDULE_FAIL,
  GET_RATING_SUCCESS,
  GET_RATING_FAIL,
  SET_RATING_SUCCESS,
  SET_RATING_FAIL,
  SET_SESSION_MEASUREMENT,
  SET_ASK_QUESTION,
  GET_SESSION_QUESTIONS,
  SET_SESSION_QUESTIONS,
  RESET_TRACKS_AND_DAY,
  TOGGLE_QUESTION_LIKE,
  COUNT_MESSAGES,
  DELETE_MESSAGE,
  GET_UPDATED_DATA,
  SET_UPDATE_DATA_COUNTER,
} from "../constants/AppConstants";

import {
  SET_HIDE_LOADER,
  SET_TOAST_MESSAGE,
} from "../constants/UtilsConstants";

import errorHandler from "../../tools/errorHandler";
import { storageGetItem, storageSetItem } from "../../tools/secureStore";
import { Platform } from "react-native";

import { APP_VERSION } from "../../constants/buildVersion";

import api from "../../service/service";

export const setAppTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
};

export const getSfsCon =
  (last_update = null, loggedInUser = null) =>
  async (dispatch) => {
    try {
      const conferenceId = await api.get(
        `/api/conferences/acronym/sfscon-latest`
      );
      const {
        data: { id },
      } = conferenceId;

      await storageSetItem("conferenceId", id);

      const params = {
        app_version: APP_VERSION,
        device: Platform.OS,
        id_user: loggedInUser?.id,
      };
      if (last_update) {
        params["last_update"] = last_update;
      }
      const url = `/api/conferences/${id}`;

      const getConferenceById = await api.get(url, { params });
      const { data } = getConferenceById;

      dispatch(setUpdateDataCounter(data.next_try_in_ms));

      if (!data?.conference) return;

      Object.keys(data?.conference?.db?.sessions).forEach((id) => {
        const session = data?.conference?.db?.sessions[id];
        session.rating =
          id in data?.conference_avg_rating?.rates_by_session
            ? data?.conference_avg_rating?.rates_by_session[id]
            : [0, 0];
      });

      dispatch({ type: GET_CONFERENCE_SUCCESS, payload: data });
    } catch (error) {
      const errMessage = errorHandler(error);
      dispatch({
        type: SET_TOAST_MESSAGE,
        payload: { message: errMessage, type: "error" },
      });
      dispatch({ type: GET_CONFERENCE_FAIL });
    }
    dispatch({ type: SET_HIDE_LOADER });
  };

export const setSelectedDay = (day) => (dispatch) => {
  dispatch({ type: SET_SELECTED_DAY, payload: day });
  setTimeout(() => {
    dispatch({ type: SET_HIDE_LOADER });
  }, 1500);
};

export const setSelectedTracks = (tracks, defaultFilter) => (dispatch) => {
  if (tracks.length) {
    tracks = [...tracks, defaultFilter];
  }

  console.log("TRACKS", tracks);
  dispatch({ type: SET_SELECTED_TRACKS, payload: tracks });
};

export const getMySchedules = () => async (dispatch) => {
  try {
    const conferenceId = await storageGetItem("conferenceId");
    const url = `/api/conferences/${conferenceId}/bookmarks`;
    const response = await api.get(url);
    const { data } = response;
    dispatch({ type: GET_MY_SCHEDULE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MY_SCHEDULE_FAIL, payload: error });
  }
};

export const setMySchedule = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/toggle-bookmark`;
    const response = await api.post(url, {});

    const {
      data: { bookmarked },
    } = response;
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message: !bookmarked
          ? "Session removed from bookmarks"
          : "Session bookmarked",
        type: "info",
      },
    });
    dispatch({ type: TOGGLE_MY_SCHEDULE });
  } catch (error) {
    const errMessage = errorHandler(error);
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: errMessage, type: "error" },
    });
  }
};

export const postRatings = (sessionId, rate) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/rate`;
    const response = await api.post(url, { rate: rate });
    const { data } = response;
    const { avg, nr, my_rate } = data;
    dispatch({
      type: SET_RATING_SUCCESS,
      payload: { avg, nr, sessionId, my_rate },
    });
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: "Thank you for your feedback", type: "info" },
    });
  } catch (error) {
    dispatch({ type: SET_RATING_FAIL });
  }
};

export const getRatings = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/rate`;
    const response = await api.get(url);
    const { data } = response;
    const { avg, nr, my_rate } = data;
    dispatch({
      type: GET_RATING_SUCCESS,
      payload: { avg, nr, sessionId, my_rate },
    });
  } catch (error) {
    dispatch({ type: GET_RATING_FAIL });
  }
};

export const getQuestions = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/messages`;
    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const { data } = response;
    dispatch({ type: GET_SESSION_QUESTIONS, payload: data });
  } catch (error) {
    console.log("errror", error);
  }
};

export const toggleQuestionLike = (messageId) => async (dispatch) => {
  try {
    const url = `/api/messenger/messages/${messageId}/like/toggle`;
    await api.patch(url, {});

    dispatch({ type: TOGGLE_QUESTION_LIKE });
  } catch (error) {}
};

export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    const url = `/api/messenger/messages/${messageId}`;
    await api.delete(url);
    dispatch({ type: DELETE_MESSAGE });
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message: "Message succesfully deleted",
        type: "info",
      },
    });
  } catch (error) {
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message: "Error deleting message",
        type: "error",
      },
    });
  }
};

export const countMessages = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/messages/count`;
    const response = await api.get(url);

    const {
      data: { count, miliseconds_till_next_check },
    } = response;

    dispatch({
      type: COUNT_MESSAGES,
      payload: { count, miliseconds_till_next_check },
    });
  } catch (error) {}
};

export const resetTracksAndDaysSelected = () => (dispatch) => {
  dispatch({ type: RESET_TRACKS_AND_DAY });
};

export const setUpdateDataCounter = (next_try_in_ms) => (dispatch) => {
  dispatch({ type: SET_UPDATE_DATA_COUNTER, payload: next_try_in_ms });
};
