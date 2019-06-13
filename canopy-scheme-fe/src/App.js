import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import * as ROUTES from "./routes";

import ProtectedRoute from "./layouts/ProtectedRoute";
import DefaultLayout from "./layouts/DefaultLayout";

import OnBoarding from "./pages/onBoarding";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import JoinGroup from "./pages/JoinGroup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/notFound";

import "bootstrap/dist/css/bootstrap.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./assets/styles/main.scss";
import "./fontawesome";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <DefaultLayout exact path={ROUTES.HOME} component={Home} />
        <DefaultLayout exact path={ROUTES.ONBOARDING} component={OnBoarding} />
        <DefaultLayout exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        <DefaultLayout exact path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <DefaultLayout exact path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />
        <DefaultLayout exact path={ROUTES.JOIN_GROUP} component={JoinGroup} />
        <ProtectedRoute path={ROUTES.APP} component={Dashboard} />
        <ProtectedRoute path={ROUTES.ADMIN} component={AdminDashboard} />
        <DefaultLayout component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
