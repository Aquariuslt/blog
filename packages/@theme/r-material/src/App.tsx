import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteConfig, RouteWithSubRoutes } from './router';

import Navigation from './core/components/Navigation';

import * as config from '@/config.json';
import { NavigationStore, NavMenu } from './core/stores/navigation.store';
import Profile from './core/components/Profile';

interface AppProps {
  routes: RouteConfig[];
  navigationStore?: NavigationStore;
}

const site = config.site;

@inject('navigationStore')
@observer
export default class App extends React.Component<AppProps> {
  render(): React.ReactNode {
    let $this = this;

    const menus: NavMenu[] = $this.props.navigationStore ? $this.props.navigationStore.menus : [];

    return (
      <Router>
        <Navigation
          title={site.title}
          menus={menus}
          profile={
            <Profile name={site.author} avatar={site.avatar} description={site.description} subtitle={site.subtitle}/>
          }
        >
          <div>
            {$this.props.routes.map(
              (route, i): JSX.Element => (
                <RouteWithSubRoutes key={i} {...route} />
              )
            )}
          </div>
        </Navigation>
      </Router>
    );
  }
}
