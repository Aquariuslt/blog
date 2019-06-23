import * as React from 'react';
import classnames from 'classnames';
import { makeStyles, useTheme, Theme, StyleRules } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RoutingItemList from '../RoutingItemList';
import BundledIcon from '../../components/BundledIcon';

import { NavMenu } from '../../stores/navigation.store';
import { ReactNode } from 'react';
import { PropsWithChildren } from 'react';

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
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    drawerSpace: {
      ...theme.mixins.toolbar,
      marginBottom: '4px'
    },
    drawerButton: {
      padding: '8px'
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

const Navigation: React.ComponentType<NavigationProps> = (
  props: PropsWithChildren<NavigationProps>
): JSX.Element => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen(): void {
    setOpen(true);
  }

  function handleDrawerClose(): void {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            href=""
            className={classnames(classes.menuButton, open && classes.hide)}
          >
            <BundledIcon type="menu"/>
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            {props.title}
          </Typography>
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
          <IconButton aria-label="Close drawer" onClick={handleDrawerClose} href="" className={classes.drawerButton}>
            <BundledIcon type="chevronLeft"/>
          </IconButton>
        </div>

        {props.menus.map(
          (menu, index): JSX.Element => (
            <RoutingItemList key={index} {...menu} />
          )
        )}
      </Drawer>
      <main
        className={classnames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerSpace}/>
        {props.children}
      </main>
    </div>
  );
};

export default Navigation;
