import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PackagePage from './containers/PackagePage';

export default () => (
  <App>
    <Router>
      <Switch>
        <Route path="/package" component={PackagePage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Router>
  </App>
);
