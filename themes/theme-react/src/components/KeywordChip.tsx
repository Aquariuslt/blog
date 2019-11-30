import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Keyword } from '@blog/common/interfaces/articles/article-metadata';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0.5)
    }
  })
);

export const KeywordChip: React.FC<Keyword> = (props) => {
  const classes = useStyles();
  return <Chip className={classes.root} label={props.label} component={RouterLink} to={props.link} clickable />;
};
