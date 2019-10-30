import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import List from '@theme-react/views/List';

// I must use Angular Style Routing for stupid react router philosophy
export const routes = [
  {
    path: '/',
    exact: true,
    component: List
  },
  {
    path: '/posts/:year/:month/:date/:id',
    exact: true,
    component: loadable(() =>
      import(
        /* webpackChunkName: "detail" */
        './views/Detail'
      )
    )
  },
  {
    path: '/posts',
    exact: true,
    component: List
  },
  {
    path: '/categories/:category',
    exact: true,
    component: List
  },
  {
    path: '/tags/:tag',
    exact: true,
    component: List
  }
];

export const RouterView: React.FC = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} render={(props) => <route.component {...props} />} />
        ))}
      </Switch>
    </Router>
  );
};
