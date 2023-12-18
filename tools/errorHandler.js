export default errorMessageHandler = (error) => {
  let message = "";
  if (error.response) {
    let errorStatus = String(error?.response?.status);

    if (errorStatus.startsWith("50")) {
      message = "Server is down.Please contact support";
    } else if (errorStatus === "404") {
      message = "Page not found";
    } else {
      message = error.response?.data?.detail || "Unknown error";
    }
  } else if (error.request) {
    message = error.request._response.id_message;
  } else {
    message = error.message;
  }
  return message;
};
