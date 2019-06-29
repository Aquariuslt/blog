import './md.css';
import * as React from 'react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';


import styles from '../../../styles';

interface PostContentProps {
  html: string;
}

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      content: {
        padding: theme.spacing(2),
        maxWidth: styles.content.maxWidth,
        width: `calc(100vw - ${theme.spacing(2)}px)`
      }
    })
);

const PostContent: React.ComponentType<PostContentProps> = (props: PostContentProps): JSX.Element => {
  const classes = useStyles();


  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.content + ' markdown-body'}
        dangerouslySetInnerHTML={{
          __html: props.html
        }}
      >
      </div>
    </div>
  );
};

export default PostContent;
