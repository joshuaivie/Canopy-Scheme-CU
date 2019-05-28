import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as ROUTES from './routes';

import ProtectedRoute from './layouts/ProtectedRoute';
import DefaultLayout from './layouts/DefaultLayout';

import Home from './pages/home';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/main.scss';
import './fontawesome';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <DefaultLayout exact path={ROUTES.HOME} component={Home} />
          <DefaultLayout exact path={ROUTES.AUTH} component={Auth} />
          <ProtectedRoute path={ROUTES.APP} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
