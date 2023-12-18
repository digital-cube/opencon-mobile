import {
  SET_TOAST_MESSAGE,
  SET_SHOW_LOADER,
  SET_HIDE_LOADER,
  SET_LAST_VISITED_ROUTE,
} from "../constants/UtilsConstants";

const initialState = {
  toast: {},
  loader: false,
};

export default ToastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOAST_MESSAGE:
      const { type, message } = action.payload;
      return {
        ...state,
        toast: { type, message },
      };

    case SET_SHOW_LOADER:
      return {
        ...state,
        loader: true,
      };
      d;

    case SET_HIDE_LOADER:
      return {
        ...state,
        loader: false,
      };

    default:
      return state;
  }
};
