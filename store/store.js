import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import AppReducer from "./reducers/AppReducer";
import UtilsReducer from "./reducers/UtilsReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  app: AppReducer,
  utils: UtilsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
