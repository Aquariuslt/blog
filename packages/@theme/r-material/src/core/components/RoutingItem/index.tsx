import * as React from 'react';
import { makeStyles, StyleRules, Theme, useTheme } from '@material-ui/core/styles';
import { NavMenuItem } from '../../stores/navigation.store';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import BundledIcon from '../../components/BundledIcon';
import { Link as RouterLink } from 'react-router-dom';

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

  return (
    <ListItem button component={RouterLink} className={classes.nested} to={props.link}>
      <ListItemIcon>
        <BundledIcon type="starBorder"/>
      </ListItemIcon>
      <ListItemText primary={props.name}/>
    </ListItem>
  );
};

export default RoutingItem;
