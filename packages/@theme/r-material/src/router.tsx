import * as React from 'react';
import { ReactNode } from 'react';
import { match, Route } from 'react-router-dom';

export interface RouteConfig {
  path: string;
  component: ReactNode | JSX.Element;
  exact?: boolean;
}

export type PropsWithRoute<P> = P & {
  match: match;
};

let allRoutes: RouteConfig[] = [];

function registerRoutes(routes): void {
  allRoutes = allRoutes.concat(routes);
}

function RouteWithSubRoutes(route): JSX.Element {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props): JSX.Element => (
        <route.component
          {...props}
          routes={route.routes}
        />
      )}
    />
  );
}

function attachRoutes(): RouteConfig[] {
  return allRoutes;
}

export { registerRoutes, attachRoutes, RouteWithSubRoutes };
