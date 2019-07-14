import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles, StyleRules, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import RoutingItemList from '../RoutingItemList';
import BundledIcon from '../../components/BundledIcon';
import LocaleSelect from '../../components/LocaleSelect';

import { NavMenu } from '../../stores/navigation.store';

interface NavigationProps {
  title: string;
  menus: NavMenu[];
  profile?: ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    title: {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'none'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    drawerSpace: {
      ...theme.mixins.toolbar,
      marginBottom: '4px'
    },
    drawerButton: {
      padding: theme.spacing(1)
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
);

const Navigation: React.ComponentType<NavigationProps> = (props: PropsWithChildren<NavigationProps>): JSX.Element => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);
  const [t] = useTranslation();

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen(): void {
    setOpen(true);
  }

  function handleDrawerClose(): void {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={t('core.navigation.open_drawer')}
            onClick={handleDrawerOpen}
            edge="start"
            className={classnames(classes.menuButton, open && classes.hide)}
          >
            <BundledIcon type="menu" />
          </IconButton>

          <Link component={RouterLink} to="/" variant="h6" color="inherit" className={classes.title}>
            {props.title}
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          {props.profile}
          <IconButton
            aria-label={t('core.navigation.close_drawer')}
            onClick={handleDrawerClose}
            className={classes.drawerButton}
          >
            <BundledIcon type="chevronLeft" />
          </IconButton>
        </div>

        {props.menus.map(
          (menu, index): JSX.Element => (
            <RoutingItemList key={index} {...menu} />
          )
        )}

        <Box flexShrink={1} height={'100%'} />
        <LocaleSelect />
      </Drawer>
      <main
        className={classnames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerSpace} />
        {props.children}
      </main>
    </div>
  );
};

export default Navigation;
