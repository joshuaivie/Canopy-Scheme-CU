import axios from "axios";

function getAuthToken() {
  return localStorage.getItem("authToken");
}

export const HTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const generateBearer = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

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
