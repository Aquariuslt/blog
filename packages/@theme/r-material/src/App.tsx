import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from './core/components/Navigation';
import Profile from './core/components/Profile';
import DocHead from './core/components/DocHead';

import * as config from '@/config.json';
import { RouteConfig, RouteWithSubRoutes } from './router';
import { NavigationStore, NavMenu } from './core/stores/navigation.store';

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
        <CssBaseline/>
        <DocHead
          title={site.title}
          root={true}
        />
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
