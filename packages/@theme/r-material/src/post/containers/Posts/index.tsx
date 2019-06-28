import * as React from 'react';
import { useEffect } from 'react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import { PostStore } from '../../stores/post.store';
import { PropsWithRoute } from '../../../router';

import PostCard from '../../components/PostCard';
import PostNavBreadcrumbs from '../../components/PostNavBreadcrumbs';

type PostsProps = {} & {
  postStore: PostStore;
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
      }
    })
);

const Posts: React.ComponentType<PropsWithRoute<PostsProps>> =
  inject('postStore')(
  observer((props: PropsWithRoute<PostsProps>): JSX.Element => {
      const classes = useStyles();

      useEffect((): void => {
        props.postStore.loadPosts(props.match.url);
      }, [props.match.url]);

      let posts = props.postStore.posts;
      let needShowBreadcrumb = !(props.match.url == '');


      return (
        <div className={classes.root}>
          {
            needShowBreadcrumb &&
            <PostNavBreadcrumbs path={props.match.url}/>
          }
          {
            posts.map((post: BlogModel.Post): JSX.Element => (
                <PostCard key={post.filename} {...post} />
              )
            )
          }
        </div>
      );
    }
));

export default Posts;
