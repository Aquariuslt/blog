import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ApiPathProps, loadApi } from '@theme-react/api';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';
import { BreadcrumbItems } from '@theme-react/components/BreadcrumbItems';
import { ArticleDetail } from '@theme-react/components/ArticleDetail';
import { ContentItems } from '@theme-react/components/ContentItems';
import { DRAWER_WIDTH } from '@theme-react/constants';

import Container from '@material-ui/core/Container';
import { ContentItem } from '@blog/common/interfaces/articles/content-item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(1)
    },
    toc: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.up('md')]: {
        width: DRAWER_WIDTH
      }
    },
    content: {
      padding: 0,
      margin: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden'
      }
    }
  })
);

export const Detail: React.FC<ApiPathProps> = (props) => {
  const classes = useStyles();
  const [routeMeta, setRouteMeta] = useState<RouteMeta>(EmptyRouteMeta);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  const loadData = async () => {
    const routeMeta = await loadApi(props.apiPath);
    setRouteMeta(routeMeta);
    setContentItems(routeMeta.data.toc);
  };

  useEffect(() => {
    loadData();
  }, [props.apiPath]);

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <BreadcrumbItems {...routeMeta.breadcrumbs} />
        <ArticleDetail {...routeMeta.data} />
      </div>
      <div className={classes.toc}>
        <ContentItems items={contentItems} />
      </div>
    </Container>
  );
};

export default Detail;
