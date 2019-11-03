import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';
import { ApiPathProps, loadApi } from '@theme-react/api';
import { ArticleCard } from '@theme-react/components/ArticleCard';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { BreadcrumbItems } from '@theme-react/components/BreadcrumbItems';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(1)
    }
  })
);

export const List: React.FC<ApiPathProps> = (props) => {
  const classes = useStyles();
  const [routeMeta, setRouteMeta] = useState<RouteMeta>(EmptyRouteMeta);
  const [articles, setArticles] = useState<Partial<ArticleContext>[]>([]);

  const loadData = async () => {
    const routeMeta = await loadApi(props.apiPath);
    setRouteMeta(routeMeta);
    setArticles(routeMeta.data);
  };

  useEffect(() => {
    loadData();
  }, [props.apiPath]);

  return (
    <Container className={classes.root}>
      <BreadcrumbItems {...routeMeta.breadcrumbs} />

      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </Container>
  );
};

export default List;
