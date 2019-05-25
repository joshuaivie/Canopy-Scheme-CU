import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import ProtectedRoute from "./layouts/ProtectedRoute";
import DefaultLayout from "./layouts/DefaultLayout";

import Home from "./pages/home";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import * as ROUTES from './links'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<DefaultLayout exact path={ROUTES.HOME} component={Home} />
			<DefaultLayout exact path={ROUTES.AUTH} component={Auth} />
			<ProtectedRoute exact path={ROUTES.APP} component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
