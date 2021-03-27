import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface ViewsShowProps {
  vkey: string;
  position?: string;
}

const VIEWS_SHOW_API_PREFIX = `https://views.show/svg?key=`;
const VIEWS_SHOW_DEFAULT_POSITION = `x=0%25&y=10%25`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0.5),
      height: 30
    }
  })
);

export const ViewsShow: React.FC<ViewsShowProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={`${VIEWS_SHOW_API_PREFIX}${props.vkey}&${VIEWS_SHOW_DEFAULT_POSITION}`} alt="views show" />
    </div>
  );
};
