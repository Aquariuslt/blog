import * as React from 'react';
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';

import { PostStore } from '../../stores/post.store';
import { PropsWithRoute } from '../../../router';

import Helmet from '../../../core/components/Helmet';

import PostContent from '../../components/PostContent';
import PostTOC from '../../components/PostTOC';
import PostComment from '../../components/PostComment';

import * as config from '@/config.json';

type PostDetailProps = {} & {
  postStore: PostStore;
};

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      nav: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        overflow: 'hidden',
        padding: 0,
        backgroundColor: theme.palette.background.paper
      }
    })
);

const PostDetail: React.ComponentType<PropsWithRoute<PostDetailProps>> = inject('postStore')(
  observer(
    (props: PropsWithRoute<PostDetailProps>): JSX.Element => {
      const classes = useStyles();
      useEffect((): void => {
        props.postStore.loadPost(props.match.url);
      }, [props.match.url]);

      const post = props.postStore.detail;

      return (
        <div className={classes.root}>
          <Helmet
            title={post.metadata.title}
            description={post.summary}
            keywords={post.metadata.tags && post.metadata.tags.join(',')}
            opengraph={post.opengraph}
          />
          <div className={classes.content}>
            <PostContent html={post.html} />
            {config.features.disqus && (
              <PostComment
                shortname={config.features.disqus}
                identifier={props.match.url.replace(/\//g, '-')}
                title={post.metadata.title}
                url={location.href}
              />
            )}
          </div>
          <div className={classes.nav}>
            <PostTOC contents={post.toc} />
          </div>
        </div>
      );
    }
  )
);

export default PostDetail;
