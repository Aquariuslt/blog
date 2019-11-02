import * as React from 'react';
import { useEffect, useState } from 'react';
import { ApiPathProps, loadApi } from '@theme-react/api';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';
import { BreadcrumbItems } from '@theme-react/components/BreadcrumbItems';
import { ArticleDetail } from '@theme-react/components/ArticleDetail';

export const Detail: React.FC<ApiPathProps> = (props) => {
  const [routeMeta, setRouteMeta] = useState<RouteMeta>(EmptyRouteMeta);

  const loadData = async () => {
    const routeMeta = await loadApi(props.apiPath);
    setRouteMeta(routeMeta);
  };

  useEffect(() => {
    loadData();
  }, [props.apiPath]);

  return (
    <div>
      <BreadcrumbItems {...routeMeta.breadcrumbs} />
      <ArticleDetail {...routeMeta.data} />
    </div>
  );
};

export default Detail;
