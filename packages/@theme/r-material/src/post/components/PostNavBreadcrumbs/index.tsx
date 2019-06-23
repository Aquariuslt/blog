import * as React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { capitalize } from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

export interface PostNavBreadcrumbsProps {
  path: string;
}

interface BreadcrumbLink {
  label: string;
  to: string;
  activated: boolean;
}

const useStyles = makeStyles((theme: Theme): StyleRules =>
  createStyles({
    root: {
      minWidth: 400,
      maxWidth: 800,
      justifyContent: 'left',
      flexWrap: 'wrap'
    },
    paper: {
      padding: theme.spacing(1, 2)
    }
  })
);

/**
 * A breadcrumbs that support all paths
 * */
const PostNavBreadcrumbs: React.ComponentType<PostNavBreadcrumbsProps> = (props: PostNavBreadcrumbsProps): JSX.Element => {

  const classes = useStyles();

  const linkPaths = props.path.split('/').filter((value): boolean => value !== '');

  const linkContents = linkPaths.map((link, index): BreadcrumbLink => {
    return {
      label: capitalize(link),
      to: '/' + linkPaths.slice(0, index + 1).join('/'),
      activated: index === linkPaths.length - 1
    };
  });

  const links = linkContents.map((link): JSX.Element => (
    <Link
      key={link.to}
      component="a"
      href={link.to}
      color={link.activated ? 'textPrimary' :'inherit'}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs
          component="nav"
          area-label="Breadcrumb"
        >
          {links}
        </Breadcrumbs>
      </Paper>
    </div>
  );
};


export default PostNavBreadcrumbs;
