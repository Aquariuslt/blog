import * as React from 'react';
import { PostStore } from '../../stores/post.store';
import { createStyles, StyleRules, Theme, makeStyles } from '@material-ui/core/styles';
import { PropsWithRoute } from '../../../router';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';


type PostDetailProps = {} & {
  postStore: PostStore;
}

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({})
);


const PostDetail: React.ComponentType<PropsWithRoute<PostDetailProps>> = inject('postStore')(
  observer((props: PropsWithRoute<PostDetailProps>): JSX.Element => {

      const classes = useStyles();
      useEffect((): void => {
        props.postStore.loadPost(props.match.url);
      }, [props.match.url]);


      return (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: props.postStore.detail.html
            }}
          />
        </div>
      );
    }
  )
);


export default PostDetail;
