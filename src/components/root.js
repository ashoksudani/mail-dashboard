import React from 'react';
import configSotre from 'utils/store-configure';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Dashboard from 'components/dashboard';
import Login from 'components/login';
import Index from 'components/index';
import NotFound from 'components/not-found';
import AuthorizedRoute from 'components/authorized-route';

import 'semantic-ui-css/semantic.min.css';
import 'styles/root.scss';

const root = () => {
  return (
    <>
      <Provider store={configSotre()}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <AuthorizedRoute path="/mail" component={Dashboard} />
            <Route path="/" exact component={Index} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default root;
