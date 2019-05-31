import React from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn() ? (
        <DefaultLayout {...rest} component={Component} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location, isRedirect: true }
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
