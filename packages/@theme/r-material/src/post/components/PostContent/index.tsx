import './md.css';
import * as React from 'react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import styles from '../../../styles';

interface PostContentProps {
  html: string;
}

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      content: {
        maxWidth: styles.content.maxWidth,
        width: `calc(100vw - ${theme.spacing(2)}px)`
      }
    })
);

const PostContent: React.ComponentType<PostContentProps> = (props: PostContentProps): JSX.Element => {
  const classes = useStyles();


  return (
    <Grid
      container
      className={classes.root}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.root}
      >
        <Card
        >
          <CardContent
            className={classes.content + ' markdown-body'}
            dangerouslySetInnerHTML={{
              __html: props.html
            }}
          >
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostContent;
