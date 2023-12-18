import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SET_UP_USER_ACCOUNT_SUCCESS,
  SET_UP_USER_ACCOUNT_FAIL,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAIL,
  GET_TENANT_ID_SUCCESS,
  GET_TENANT_ID_FAIL,
  DELETE_ACCOUNT,
  SET_PROFILE_PICTURE,
  SET_PROFILE_PICTURE_LOADER,
  RESET_ERROR,
  LOGOUT,
} from "../constants/AuthConstants";
import axios from "axios";
import {
  storageDeleteItem,
  storageGetItem,
  storageSetItem,
} from "../../tools/secureStore";
import {
  SET_TOAST_MESSAGE,
  SET_HIDE_LOADER,
  SET_SHOW_LOADER,
} from "../constants/UtilsConstants";

import errorHandler from "../../tools/errorHandler";

import api from "../../service/service";

export const getServerName = () => async (dispatch) => {
  try {
    const response = await api.get(`/api/tenants/code/OPENCON`);
    const {
      data: { id },
    } = response;
    await storageSetItem("tenantId", id);
    dispatch({ type: GET_TENANT_ID_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: GET_TENANT_ID_FAIL });
  }
};

export const registerPretixUser =
  (pretixCode, expoPushToken, phoneDetails) => async (dispatch) => {
    try {
      const conferenceId = await storageGetItem("conferenceId");
      const url = `/api/conferences/${conferenceId}/pretix`;

      const response = await api.post(url, {
        order: pretixCode,
        pushToken: expoPushToken,
        device: phoneDetails,
      });
      const { data } = response;

      await storageSetItem("jwt", data.token);

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      dispatch(checkIfTokenIsValid());
    } catch (error) {
      const errMessage = errorHandler(error);
      dispatch({
        type: SET_TOAST_MESSAGE,
        payload: { message: errMessage, type: "error" },
      });
      dispatch({ type: REGISTER_USER_FAIL });
    }
  };

export const checkIfTokenIsValid = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");
    const url = `/api/tenants/me`;
    const response = await api.get(url);
    const { data } = response;
    dispatch({ type: CHECK_TOKEN_SUCCESS, payload: { jwt, data } });
  } catch (err) {
    dispatch({ type: CHECK_TOKEN_FAIL, payload: err });
  } finally {
    dispatch({ type: SET_HIDE_LOADER });
  }
};

export const myAccount = (user) => async (dispatch) => {
  try {
    const url = `/api/tenants/me`;
    const response = await api.patch(url, user);
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: "User succesfully updated", type: "info" },
    });
    dispatch(checkIfTokenIsValid());
    dispatch({ type: SET_UP_USER_ACCOUNT_SUCCESS });
  } catch (error) {
    const errMessage = errorHandler(error);
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: errMessage, type: "error" },
    });
    dispatch({ type: SET_UP_USER_ACCOUNT_FAIL });
  }
};

export const deleteAccount = (password, setRedirect) => async (dispatch) => {
  try {
    const url = `/api/tenants/delete-user-account`;
    const response = await api.post(url, { password });
    const { data } = response;
    dispatch({ type: DELETE_ACCOUNT, payload: data });
    if (data && setRedirect) {
      setRedirect(true);
    }
  } catch (error) {
    const errMessage = errorHandler(error);
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: errMessage, type: "error" },
    });
  }
};

export const setUpProfilePicture = (data, resetState) => async (dispatch) => {
  try {
    const url = `/api/tenants/me`;
    await api.patch(url, { profile_picture_base64_encoded: data });

    dispatch(checkIfTokenIsValid());
    resetState();
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message: "Your photo has been successfully updated.",
        type: "info",
      },
    });
    dispatch({ type: SET_PROFILE_PICTURE });
  } catch (error) {
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message:
          "There was an error while uploading your photo. Please try again.",
        type: "error",
      },
    });
  }
};

export const setProfilePictureLoader = () => (dispatch) => {
  dispatch({ type: SET_PROFILE_PICTURE_LOADER });
};

export const logout = () => async (dispatch) => {
  await storageDeleteItem("jwt");
  dispatch({ type: LOGOUT });
};

export const getProfilePicture = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");
    const url = `/api/files/static/22c`;
  } catch (error) {}
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const showLoader = () => (dispatch) => {
  dispatch({ type: SET_SHOW_LOADER });
};

export const hideLoader = () => (dispatch) => {
  dispatch({ type: SET_HIDE_LOADER });
};
