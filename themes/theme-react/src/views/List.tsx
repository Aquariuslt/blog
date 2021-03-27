import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EmptyRouteMeta, Meta, RouteMeta, RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ApiPathProps, loadApi } from '@theme-react/api';
import { ArticleCard } from '@theme-react/components/ArticleCard';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { BreadcrumbList } from '@theme-react/components/BreadcrumbList';
import { TYPE_JSON_LD } from '@theme-react/constants';
import { buildURLPath } from '@blog/common/utils/path.util';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    }
  })
);

export const List: React.FC<ApiPathProps> = (props) => {
  const classes = useStyles();
  const [routeMeta, setRouteMeta] = useState<RouteMeta>(EmptyRouteMeta);
  const [metas, setMetas] = useState<Meta[]>([]);

  const [articles, setArticles] = useState<Partial<ArticleContext>[]>([]);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);

  const loadData = async () => {
    const routeMeta = await loadApi(props.apiPath);
    setRouteMeta(routeMeta);
    setArticles(routeMeta.data);
    setMetas(routeMeta.metas);
  };

  useEffect(() => {
    loadData();
    setShowBreadcrumbs(!(props.apiPath === buildURLPath(RoutePathPrefix.HOME_ALIAS)));
  }, [props.apiPath]);

  return (
    <Container className={classes.root}>
      <Helmet>
        <title>{routeMeta.title}</title>
        <script type={TYPE_JSON_LD}>{JSON.stringify(routeMeta.breadcrumbs)}</script>
        {metas.map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
      </Helmet>

      {showBreadcrumbs && <BreadcrumbList {...routeMeta.breadcrumbs} />}

      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </Container>
  );
};

export default List;
