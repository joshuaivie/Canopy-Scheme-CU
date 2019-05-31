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

export function handleErrors(e) {
  if (e.response) {
    if (e.response.status === 500) {
      console.log("ERROR 500: Server ran into a problem");
      return "We ran into an error, we'll notify the development team right away";
    } else if (e.response.status === 404) {
      console.log("ERROR 404: Page not found");
      return 404;
    } else if (e.response.status === 401) {
      console.log("ERROR 401: Unauthorized");
      localStorage.removeItem("authToken");
      window.location.replace("/");
    } else {
      console.log("ERROR 400: error in response");
      Object.keys(e.response.data).forEach(function(key) {
        for (let i = 0; i < e.response.data[key].length; i++) {
          // msg.push(`${e.response.data[key][i]}`);
          console.log(`${e.response.data[key][i]}`);
        }
      });
      return e.response.data.error;
    }
  } else {
    console.log("ERROR 0: Server is down or there is no internet connection");
    return "Unable to connect, try again";
  }
}
