import * as React from 'react';

import Helmet from 'react-helmet';


interface DocHeadProps {
  title: string;
  root?: boolean;

  description?: string;
  keywords?: string;

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


  if (props.root) {
    window[DOC_HEAD_BASE_KEY] = props;
  }

  const defaultProps = window[DOC_HEAD_BASE_KEY] || DEFAULT_DOC_HEAD;

  let title = getTitle(props.title, defaultProps.title);
  let description = getDescription(props.description, defaultProps.description);
  let keywords = getKeywords(props.keywords, defaultProps.keywords);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Helmet>
  );
};


export default DocHead;
