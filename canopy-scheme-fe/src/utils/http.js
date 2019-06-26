import axios from "axios";
import { UserStorage } from "storage";
import { errorAlert } from "utils/notification";
import { toast } from "react-toastify";
import React from "react";
import * as ROUTES from "routes";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const mergeHeaders = (...headerCollections) => {
  const result = {};
  headerCollections.map(content => {
    const { headers } = content;
    return Object.assign(result, headers);
  });

  return { headers: result };
};

export const generateBearer = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateMultipartHeader = () => {
  return { headers: { "Content-Type": `multipart/form-data` } };
};

function errorHandler(e) {
  const res = { status: 0, data: "Error, could not connect." };

  if (e.response && e.response.status === 500) {
    res.status = 500;
    res.data = "We ran into an error, we'll notify the development team right away";
  } else if (e.response && e.response.status === 404) {
    res.status = 404;
    res.data = "URL not found";
  } else if (e.response && e.response.status === 401) {
    errorAlert("Your authorization token is invalid");
    UserStorage.unsetToken();
    UserStorage.unsetUserInfo();
    UserStorage.unsetRefreshToken();
    window.location.replace(ROUTES.HOME);
  } else if (e.response && (e.response.status === 400 || e.response.status === 403)) {
    res.status = e.response.status;
    res.data = e.response.data;
  }
  return res;
}

export function resolveRequestError(err, showAllAlert = true) {
  const { status, data } = errorHandler(err);
  if (data.emailNotVerified) {
    errorAlert(data.msg);
    UserStorage.updateUserInfo({ email_verified: false });
    return;
  }
  if (data.errors) throw data.errors;
  if (showAllAlert === true) {
    errorAlert(data.msg || data);
    throw err;
  }
  if (status === 0) {
    errorAlert(data);
    throw err;
  }
}

export default HTTP;

export const networkAvailability = componentInstance => {
  window.addEventListener("offline", e => {
    if (toast.isActive(window.networkToast)) {
      toast.update(window.networkToast, {
        autoClose: false,
        type: toast.TYPE.ERROR,
        render: "You are offline"
      });
    } else {
      window.networkToast = toast.error("You are offline", {
        autoClose: false,
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
    componentInstance.setState({ offline: true });
  });
  window.addEventListener("online", e => {
    if (toast.isActive(window.networkToast)) {
      toast.update(window.networkToast, {
        autoClose: 3000,
        type: toast.TYPE.INFO,
        render: "You are back online"
      });
    } else {
      window.networkToast = toast.info("You are back online", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
    componentInstance.setState({ offline: false });
  });
};

export const NetworkAvailabilityContext = React.createContext({
  offline: false
});
