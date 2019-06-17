import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "utils/auth";
import DefaultLayout from "./DefaultLayout";
import * as ROUTES from "routes";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <DefaultLayout {...rest} component={Component} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.HOME,
            state: { from: props.location, isRedirect: true }
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
