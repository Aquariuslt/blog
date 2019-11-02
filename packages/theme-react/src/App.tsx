import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { RouterView } from '@theme-react/router';
import { Navigation } from '@theme-react/components/Navigation';
import { EmptyProfile } from '@blog/common/interfaces/profile';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { buildURLPath } from '@blog/common/utils/path.util';
import { loadApi } from '@theme-react/api';
import { theme } from '@theme-react/constants';

export const App: React.FC = () => {
  const [navigationItems, setNavigationItems] = useState([]);
  const [profile, setProfile] = useState(EmptyProfile);

  const loadNavigation = async () => {
    const navigation = await loadApi(buildURLPath(RoutePathPrefix.NAVIGATION));
    setNavigationItems(navigation.data);
  };

  const loadProfile = async () => {
    const profile = await loadApi(buildURLPath(RoutePathPrefix.PROFILE));
    setProfile(profile.data);
  };

  useEffect(() => {
    loadNavigation();
    loadProfile();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation profile={profile} menus={navigationItems}>
          <RouterView />
        </Navigation>
      </Router>
    </ThemeProvider>
  );
};
