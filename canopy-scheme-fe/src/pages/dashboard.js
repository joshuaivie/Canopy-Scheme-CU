import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sidebar from '../components/DashboardComponents/sidebar';
import Profile from '../components/DashboardComponents/profile';
import Allocation from '../components/DashboardComponents/allocation';
import Something from '../components/DashboardComponents/something';

import * as ROUTES from '../routes';

export default () => (
    <section className="dashboard-container">
      <Sidebar />
      <div className="app-container">
        <Switch>
          <Route exact path={ROUTES.APP} component={Profile} />
          <Route path={ROUTES.ALLOCATION} component={Allocation} />
          <Route path={ROUTES.SOMETHING} component={Something} />
        </Switch>
      </div>
    </section>
  );

