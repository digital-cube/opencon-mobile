import {
  SET_TOAST_MESSAGE,
  SET_SHOW_LOADER,
  SET_HIDE_LOADER,
} from "../constants/UtilsConstants";

export const setToastMessage = (payload) => (dispatch) => {
  dispatch({ type: SET_TOAST_MESSAGE, payload });
};

export const showLoader = () => (dispatch) => {
  dispatch({ type: SET_SHOW_LOADER });
};

export const hideLoader = () => (dispatch) => {
  dispatch({ type: SET_HIDE_LOADER });
};
