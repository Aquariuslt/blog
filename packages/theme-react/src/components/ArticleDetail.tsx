import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { ContentItems } from '@theme-react/components/ContentItems';

export const ArticleDetail: React.FC<Partial<ArticleContext>> = (props) => {
  return (
    <Paper>
      <ContentItems items={props.toc || []} />

      <Typography
        component="div"
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: props.html || ''
        }}
      ></Typography>
    </Paper>
  );
};
