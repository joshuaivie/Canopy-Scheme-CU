import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function get(url, use_header = false) {
  if (use_header) {
    getAuthToken();
    return axios.get(`${API_URL}${url}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
  }
  return axios.get(`${API_URL}${url}`);
}

export function post(url, data, use_header = false) {
  if (use_header) {
    return axios.post(`${API_URL}${url}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
  }
  return axios.post(`${API_URL}${url}`, data);
}

export function put(url, data, use_header = false) {
  if (use_header) {
    return axios.put(`${API_URL}${url}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
  }
  return axios.post(`${API_URL}${url}`, data);
}

export function del(url, use_header = false) {
  if (use_header) {
    return axios.delete(`${API_URL}${url}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
  }
  return axios.delete(`${API_URL}${url}`);
}

export function responseErrorObj(e) {
  const res = { status: 0, message: "You are offline" };
  if (e.response) {
    if (e.response.status === 500) {
      console.log("ERROR 500: Server ran into a problem");
      res.status = 500;
      res.message =
        "We ran into an error, we'll notify the development team right away";
    } else if (e.response.status === 404) {
      console.log("ERROR 404: Url not found");
      res.status = 404;
      res.message = "Url not found";
    } else if (e.response.status === 401) {
      console.log("ERROR 401: Unauthorized");
      localStorage.removeItem("authToken");
      window.location.replace("/");
    } else if (e.response.status === 400) {
      console.log("ERROR 400: error in response");
      // console.log(e.response.data);
      res.status = 400;
      res.message = e.response.data;
    }
  } else {
    console.log("ERROR 0: You are offline");
  }
  return res;
}
