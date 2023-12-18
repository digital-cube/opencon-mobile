export const getData = (objToSearch, searchId) => {
  for (let k in objToSearch) {
    if (k === searchId) {
      return objToSearch[k];
    }
  }
};

export const getTimeFromDate = (date) => {
  return String(date.slice(10, 16)).trim();
};

export const fromObjectToArray = (obj) => {
  return (
    obj &&
    Object.keys(obj).map((key) => {
      return {
        id: key,
        ...obj[key],
      };
    })
  );
};
