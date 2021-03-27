import '@theme-react/markdown.css';
import * as React from 'react';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CARD_MAX_WIDTH } from '@theme-react/constants';
import { Comment } from 'react-disqus-components';
import { KeywordChip } from '@theme-react/components/KeywordChip';
import { ViewsShow } from '@theme-react/components/ViewsShow';
import { LazyImage } from '@theme-react/components/LazyImage';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div className={classes.root}>
      <LazyImage image={props.cover} alt={props.title} className={classes.cover} lazy={false} />
      <Typography
        component="div"
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: props.html || ''
        }}
      />

      <div className={classes.divider} />

      {props.id && <ViewsShow vkey={props.id} />}
      {props.tags && (props.tags as any).map((keyword) => <KeywordChip key={keyword.id} {...keyword} />)}
      <Comment title={props.title} {...props['disqus']} />
    </div>
  );
};
