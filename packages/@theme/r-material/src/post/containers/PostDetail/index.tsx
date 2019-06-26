import * as React from 'react';
import { useEffect } from 'react';
import { PostStore } from '../../stores/post.store';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { PropsWithRoute } from '../../../router';
import { inject, observer } from 'mobx-react';
import PostContent from '../../components/PostContent';


type PostDetailProps = {} & {
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


const PostDetail: React.ComponentType<PropsWithRoute<PostDetailProps>> = inject('postStore')(
  observer((props: PropsWithRoute<PostDetailProps>): JSX.Element => {

      const classes = useStyles();
      useEffect((): void => {
        props.postStore.loadPost(props.match.url);
      }, [props.match.url]);


      return (
        <div className={classes.root}>
          <PostContent html={props.postStore.detail.html}/>
        </div>
      );
    }
  )
);


export default PostDetail;
