import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import ProtectedRoute from "./layouts/ProtectedRoute";

import Home from "./pages/home";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import DefaultLayout from "./layouts/DefaultLayout";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<DefaultLayout exact path="/" component={Home} />
			<DefaultLayout exact path="/auth" component={Auth} />
			<ProtectedRoute exact path="/app" component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
