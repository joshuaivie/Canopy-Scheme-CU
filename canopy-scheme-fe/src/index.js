import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_KEY });
// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
