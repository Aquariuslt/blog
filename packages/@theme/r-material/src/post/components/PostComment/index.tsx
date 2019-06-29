import * as React from 'react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Disqus from 'disqus-react';

import styles from '../../../styles';

interface PostCommentProps {
  url: string;
  identifier: string;
  title: string;
  shortname: string;
}


const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      content: {
        padding: theme.spacing(2),
        maxWidth: styles.content.maxWidth,
        width: `calc(100vw - ${theme.spacing(2)}px)`
      }
    })
);

const PostComment: React.ComponentType<PostCommentProps> = (props: PostCommentProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Disqus.DiscussionEmbed
        shortname={props.shortname}
        config={{
          url: props.url,
          identifier: props.identifier,
          title: props.title
        }}
      />
    </div>
  );
};

export default PostComment;
