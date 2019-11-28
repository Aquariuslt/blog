import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EmptyRouteMeta, Meta, RouteMeta } from '@blog/common/interfaces/routes';
import { ApiPathProps, loadApi } from '@theme-react/api';
import { CARD_MAX_WIDTH, TYPE_JSON_LD } from '@theme-react/constants';
import { BreadcrumbList } from '@theme-react/components/BreadcrumbList';
import { CollectionCard } from '@theme-react/components/CollectionCard';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: CARD_MAX_WIDTH,
      backgroundColor: theme.palette.background.default,
      paddingTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    },
    content: {
      padding: 0,
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden'
    }
  })
);

export const Table: React.FC<ApiPathProps> = (props) => {
  const classes = useStyles();
  const [routeMeta, setRouteMeta] = useState<RouteMeta>(EmptyRouteMeta);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [collections, setCollections] = useState([]);

  const loadData = async () => {
    const routeMeta = await loadApi(props.apiPath);
    setRouteMeta(routeMeta);
    setMetas(routeMeta.metas);
    setCollections(routeMeta.data);
  };

  useEffect(() => {
    loadData();
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

      <BreadcrumbList {...routeMeta.breadcrumbs} />

      <div className={classes.content}>
        {collections.map((collection, index) => (
          <CollectionCard key={index} {...collection} />
        ))}
      </div>
    </Container>
  );
};

export default Table;
