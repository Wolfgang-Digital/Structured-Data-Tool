import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { RouteWithSubrouteProps } from 'types';

export const RouteWithSubroutes: React.FC<RouteWithSubrouteProps> = ({ path, exact, routes, component: Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => <Component {...props} routes={routes} />}
    />
  );
};

export const RenderRoutes: React.FC<{ routes: RouteWithSubrouteProps[] }> = ({ routes }) => {
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubroutes {...route} />
      ))}
    </Switch>
  );
};