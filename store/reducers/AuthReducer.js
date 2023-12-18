import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAIL,
  GET_TENANT_ID_SUCCESS,
  DELETE_ACCOUNT,
  SET_PROFILE_PICTURE_LOADER,
  SET_PROFILE_PICTURE,
  RESET_ERROR,
  LOGOUT,
} from "../constants/AuthConstants";

const initialState = {
  tenantId: "",
  error: null,
  regError: false,
  registeredUser: null,
  isInsideTheApp: false,
  profilePictureLoader: false,
  disableButton: false,
};

export default AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TENANT_ID_SUCCESS:
      return {
        ...state,
        tenantId: action.payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registeredUser: action.payload,
        disableButton: true,
        regError: false,
      };

    case REGISTER_USER_FAIL:
      return {
        ...state,
        regError: true,
      };

    case RESET_ERROR:
      return {
        ...state,
        regError: false,
      };

    case CHECK_TOKEN_SUCCESS:
      const userInfo = Object.assign({}, action?.payload?.data);
      return {
        ...state,
        isInsideTheApp: true,
        registeredUser: userInfo,
      };

    case CHECK_TOKEN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePictureLoader: false,
      };

    case SET_PROFILE_PICTURE_LOADER:
      return { ...state, profilePictureLoader: true };

    case DELETE_ACCOUNT:
      const { confirmation_key } = action.payload;
      return {
        ...state,
        isInsideTheApp: false,
        deleteAccountConfirmationKey: confirmation_key,
      };

    case LOGOUT:
      return { ...state, registeredUser: null };

    default:
      return state;
  }
};
