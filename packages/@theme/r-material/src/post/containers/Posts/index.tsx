import * as React from 'react';
import { useEffect } from 'react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { capitalize } from 'lodash';

import { PostStore } from '../../stores/post.store';
import { PropsWithRoute } from '../../../router';

import PostCard from '../../components/PostCard';
import PostNavBreadcrumbs from '../../components/PostNavBreadcrumbs';
import DocHead from '../../../core/components/DocHead';

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

        let routePrefix = capitalize(props.match.url.split('/')[1]);
        let routeSuffix = props.match.url.split('/').slice(2).join('-');
        let title = needShowBreadcrumb ? `${routePrefix} : ${routeSuffix}` : '';

        return (
          <div className={classes.root}>
            <DocHead
              title={title}
            />
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
