import * as React from 'react';
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';

import { PageStore } from '../../stores/page.store';
import { PropsWithRoute } from '../../../router';

import Helmet from '../../../core/components/Helmet';

import PostContent from '../../components/PostContent';
import PostTOC from '../../components/PostTOC';
import PostComment from '../../components/PostComment';
import PostJsonLd from '../../components/PostJsonLd';

import * as config from '@/config.json';

type PageDetailProps = {} & {
  pageStore: PageStore;
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

const PageDetail: React.ComponentType<PropsWithRoute<PageDetailProps>> = inject('pageStore')(
  observer(
    (props: PropsWithRoute<PageDetailProps>): JSX.Element => {
      const classes = useStyles();
      useEffect((): void => {
        props.pageStore.loadPage(props.match.url);
      }, [props.match.url]);

      const post = props.pageStore.detail;

      return (
        <div className={classes.root}>
          <Helmet
            title={post.metadata.title}
            description={post.summary}
            keywords={post.metadata.tags && post.metadata.tags.join(',')}
            opengraph={post.opengraph}
          />
          <PostJsonLd item={post.jsonld} />

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

export default PageDetail;
