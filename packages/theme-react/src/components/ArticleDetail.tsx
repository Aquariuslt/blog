import '@theme-react/markdown.css';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CARD_MAX_WIDTH } from '@theme-react/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0),
      maxWidth: CARD_MAX_WIDTH,
      width: '100%',
      padding: theme.spacing(0, 2)
    }
  })
);

export const ArticleDetail: React.FC<Partial<ArticleContext>> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root + ' markdown-body'}>
      <Typography
        component="div"
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: props.html || ''
        }}
      />
    </div>
  );
};
