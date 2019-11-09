import '@theme-react/markdown.css';
import lozad from 'lozad';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CARD_MAX_WIDTH } from '@theme-react/constants';
import { Comment } from 'react-disqus-components';
import { KeywordChip } from '@theme-react/components/KeywordChip';
import { useCallback, useRef } from 'react';
import { useEffect } from 'react';

const placeholder = require('@theme-react/imgs/placeholder.png');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0),
      maxWidth: CARD_MAX_WIDTH,
      width: '100%',
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    },
    cover: {
      width: '100%',
      maxWidth: '100%'
    },
    divider: {
      marginTop: theme.spacing(2)
    }
  })
);

export const ArticleDetail: React.FC<Partial<ArticleContext>> = (props) => {
  const classes = useStyles();
  const coverImageElement = useCallback(
    (node) => {
      if (node != null) {
        node.removeAttribute('data-loaded');
        const observer = lozad(node);
        observer.observe();
      }
    },
    [props.cover]
  );

  return (
    <div className={classes.root}>
      <img ref={coverImageElement} src={placeholder} data-src={props.cover} alt="cover" className={classes.cover} />
      <Typography
        component="div"
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: props.html || ''
        }}
      />

      <div className={classes.divider} />

      {props.tags && (props.tags as any).map((keyword) => <KeywordChip key={keyword.id} {...keyword} />)}
      <Comment title={props.title || ''} {...props['disqus']} />
    </div>
  );
};
