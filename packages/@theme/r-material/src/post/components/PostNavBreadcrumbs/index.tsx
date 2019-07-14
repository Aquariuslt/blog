import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import styles from '../../../styles';

export interface PostNavBreadcrumbsProps {
  path: string;
}

interface BreadcrumbLink {
  label: string;
  to: string;
  activated: boolean;
}

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      breadcrumbs: {
        maxWidth: styles.content.maxWidth,
        padding: theme.spacing(1, 1)
      }
    })
);

/**
 * A breadcrumbs that support all paths
 * */
const PostNavBreadcrumbs: React.ComponentType<PostNavBreadcrumbsProps> = (
  props: PostNavBreadcrumbsProps
): JSX.Element => {
  const classes = useStyles();

  const linkPaths = props.path.split('/').filter((value): boolean => value !== '');

  const linkContents = linkPaths.map(
    (link, index): BreadcrumbLink => {
      return {
        label: capitalize(link),
        to: '/' + linkPaths.slice(0, index + 1).join('/'),
        activated: index === linkPaths.length - 1
      };
    }
  );

  const links = linkContents.map(
    (link): JSX.Element => (
      <Link key={link.to} component={RouterLink} to={link.to} color={link.activated ? 'textPrimary' : 'inherit'}>
        {link.label}
      </Link>
    )
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.breadcrumbs}>
        <Paper elevation={0}>
          <Breadcrumbs component="nav" area-label="Breadcrumb">
            {links}
          </Breadcrumbs>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PostNavBreadcrumbs;
