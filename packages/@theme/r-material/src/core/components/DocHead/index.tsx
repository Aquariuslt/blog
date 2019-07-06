import * as React from 'react';

import Helmet from 'react-helmet';


interface DocHeadProps {
  title: string;
  root?: boolean;

  description?: string;
  keywords?: string;

  opengraph?: OpenGraph.Meta;
}


const DEFAULT_DOC_HEAD = {
  title: ''
};

const DOC_HEAD_BASE_KEY = '__DOC_HEAD_BASE_KEY__';
const TITLE_SPLIT_KEY = ' | ';
const KEYWORD_JOIN_KEY = ',';

const DocHead: React.ComponentType<DocHeadProps> = (props: DocHeadProps): JSX.Element => {

  const getTitle = (propsTitle, baseTitle): string => {
    const showBaseTitle = (propsTitle === baseTitle || propsTitle === '');
    const showPropsTitle = (baseTitle === '');

    if (showBaseTitle) {
      return baseTitle;
    }

    if (showPropsTitle) {
      return propsTitle;
    }

    return [propsTitle, baseTitle].join(TITLE_SPLIT_KEY);
  };

  const getDescription = (propsDesc, baseDesc): string => {
    return propsDesc || baseDesc;
  };

  const getKeywords = (propsKeywords, baseKeywords): string => {
    return [propsKeywords, baseKeywords]
      .filter((item): boolean => !(item === undefined))
      .join(KEYWORD_JOIN_KEY);
  };

  const getOpengraph = (propsOpengraph, baseOpengraph): OpenGraph.Meta => {
    return propsOpengraph || baseOpengraph;
  };


  if (props.root) {
    window[DOC_HEAD_BASE_KEY] = props;
  }

  const defaultProps = window[DOC_HEAD_BASE_KEY] || DEFAULT_DOC_HEAD;

  const title = getTitle(props.title, defaultProps.title);
  const description = getDescription(props.description, defaultProps.description);
  const keywords = getKeywords(props.keywords, defaultProps.keywords);

  const ogMeta = getOpengraph(props.opengraph, defaultProps.opengraph);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>

      {
        ogMeta &&
        Object.keys(ogMeta).map((key) => (
          <meta name={key} content={ogMeta[key]} key={key}/>
        ))
      }
    </Helmet>
  );
};


export default DocHead;
