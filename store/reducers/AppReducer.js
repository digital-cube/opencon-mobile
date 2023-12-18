import {
  SET_THEME,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAIL,
  SET_SELECTED_DAY,
  SET_SELECTED_TRACKS,
  GET_MY_SCHEDULE,
  GET_MY_SCHEDULE_SUCCESS,
  TOGGLE_MY_SCHEDULE,
  SET_RATING_SUCCESS,
  SET_SESSION_MEASUREMENT,
  SET_SESSION_QUESTIONS,
  GET_SESSION_QUESTIONS,
  RESET_TRACKS_AND_DAY,
  TOGGLE_QUESTION_LIKE,
  COUNT_MESSAGES,
  SET_UPDATE_DATA_COUNTER,
  GET_RATING_SUCCESS,
} from "../constants/AppConstants";

const initialState = {
  language: "en",
  theme: "light",
  db: null,
  error: {},
  loader: false,
  selectedDay: "",
  selectedTracks: [],
  mySchedules: [],
  scheduleToggled: 0,
  rating: {},
  myRate: null,
  ratingAdded: 0,
  measurements: [],
  questions: {},
  questionAdded: 0,
  questionLiked: 0,
  count: 0,
  forceReloadCounter: 0,
  nextCheck: 2000,
  updatedDataCounter: 0,
  lastTimeUpdated: "2020-11-02 09:59:08.792982",
  nextTryInMs: null,
};

export default AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_UPDATE_DATA_COUNTER:
      return {
        ...state,
        nextTryInMs: action.payload,
        updatedDataCounter: state.updatedDataCounter + 1,
      };

    case GET_CONFERENCE_SUCCESS:
      const selectedDay = action.payload.conference?.idx.days[0];
      return {
        ...state,
        db: action.payload,
        selectedDay: selectedDay,
        lastTimeUpdated: action.payload.last_updated,
      };

    case GET_CONFERENCE_FAIL:
      return {
        ...state,
      };

    case SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };

    case SET_SELECTED_TRACKS:
      return {
        ...state,
        selectedTracks: action.payload,
      };

    case GET_MY_SCHEDULE_SUCCESS:
      return {
        ...state,
        mySchedules: action.payload,
      };

    case TOGGLE_MY_SCHEDULE:
      return {
        ...state,
        scheduleToggled: state.scheduleToggled + 1,
      };

    case GET_RATING_SUCCESS:
      const { my_rate } = action.payload;

      return {
        ...state,
        myRate: my_rate,
      };

    case SET_RATING_SUCCESS:
      const { avg, nr, sessionId } = action.payload;
      const database = JSON.parse(JSON.stringify(state.db));
      Object.keys(database?.conference?.db?.sessions).forEach((id) => {
        const session = database?.conference?.db?.sessions[id];
        if (id === sessionId) {
          session.rating = [avg, nr];
        }
        return session;
      });

      return {
        ...state,
        ratingAdded: state.ratingAdded + 1,
        db: database,
        myRate: action?.payload?.my_rate,
      };

    case SET_SESSION_MEASUREMENT:
      return {
        ...state,
        measurements: action.payload,
      };

    case SET_SESSION_QUESTIONS:
      return {
        ...state,
        questionAdded: state.questionAdded + 1,
      };

    case GET_SESSION_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case TOGGLE_QUESTION_LIKE:
      return {
        ...state,
        questionLiked: state.questionLiked + 1,
      };

    case RESET_TRACKS_AND_DAY:
      const defaultDay = state.db?.conference?.idx.days[0];
      return {
        ...state,
        selectedTracks: [],
        selectedDay: defaultDay,
        questions: [],
        questionAdded: 0,
        questionLiked: 0,
      };

    case COUNT_MESSAGES:
      const { count, miliseconds_till_next_check } = action.payload;
      return {
        ...state,
        count,
        nextCheck: miliseconds_till_next_check,
        forceReloadCounter: state.forceReloadCounter + 1,
      };

    default:
      return state;
  }
};
