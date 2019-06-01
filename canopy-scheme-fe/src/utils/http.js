import axios from "axios";
import { errorAlert } from "./notification";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const generateBearer = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

function errorHandler(e) {
  const res = { status: 0, data: "You are currently offline" };

  if (e.response && e.response.status === 500) {
    res.status = 500;
    res.data = "We ran into an error, we'll notify the development team right away";
  } else if (e.response && e.response.status === 404) {
    res.status = 404;
    res.data = "URL not found";
  } else if (e.response && e.response.status === 401) {
    // localStorage.removeItem("authToken");
    // window.location.replace("/");
  } else if (e.response && e.response.status === 400) {
    res.status = 400;
    res.data = e.response.data;
  }
  return res;
}

export function resolveRequestError(err, showAllAlert = true) {
  const { status, data } = errorHandler(err);
  if (data.errors) throw data.errors;
  if (showAllAlert === true) {
    errorAlert(data.msg);
    throw err;
  }
  if (status === 0) errorAlert(data);
}

export default HTTP;
