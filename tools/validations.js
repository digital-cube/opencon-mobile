import { storageGetItem } from "./secureStore";

export const validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

export const validatePhoneNumber = /[- +()0-9]{7,}/;

export const checkForToken = async (setAuth) => {
  const jwt = await storageGetItem("jwt");
  return setAuth(jwt);
};

export const filterObject = (objToFilter) => {
  return Object.keys(objToFilter)
    .filter((s) => {
      return objToFilter[s];
    })
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: objToFilter[key],
      });
    }, {});
};

export const validate = (obj) => {
  return Object.keys(obj).every((val) => obj[val]);
};
