import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, StyleRules, Theme, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { NavMenu } from '../../stores/navigation.store';
import BundledIcon from '../../components/BundledIcon';
import RoutingItem from '../../components/RoutingItem';

type RoutingItemListProps = NavMenu;

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      paddingTop: 0,
      paddingBottom: 0
    }
  })
);

const RoutingItemList: React.ComponentType<RoutingItemListProps> = (props: RoutingItemListProps): JSX.Element => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const [open, setOpen] = React.useState(false);
  const [t] = useTranslation();

  function toggleOpen(): void {
    setOpen(!open);
  }

  return (
    <List component="nav" className={classes.root}>
      <ListItem component="div" button onClick={toggleOpen} aria-label="Toggle Menu">
        <ListItemIcon>
          <BundledIcon type={props.icon || 'menu'} />
        </ListItemIcon>
        <ListItemText primary={t(props.name)} />
        {open ? <BundledIcon type="expandLess" /> : <BundledIcon type="expandMore" />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.child.map(
            (childProps, index): JSX.Element => (
              <RoutingItem key={index} {...childProps} />
            )
          )}
        </List>
      </Collapse>
    </List>
  );
};

export default RoutingItemList;
