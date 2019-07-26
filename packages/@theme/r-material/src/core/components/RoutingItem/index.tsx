import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, StyleRules, Theme, useTheme } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import { NavMenuItem } from '../../stores/navigation.store';
import BundledIcon from '../../components/BundledIcon';

type RoutingItemProps = NavMenuItem;

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 360
    },
    lists: {
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const RoutingItem: React.ComponentType<RoutingItemProps> = (props: RoutingItemProps): JSX.Element => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const isExtLink = props.ext;

  const listItemInnerRenderProps = {
    component: RouterLink,
    to: props.link
  };

  const listItemExtRenderProps = {
    component: 'a',
    href: props.link,
    target: '_blank',
    rel: 'noopener'
  };

  const actualRenderProps = isExtLink ? listItemExtRenderProps : listItemInnerRenderProps;

  return (
    <ListItem button className={classes.nested} {...actualRenderProps}>
      <ListItemIcon>
        <BundledIcon type="starBorder" />
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default RoutingItem;
