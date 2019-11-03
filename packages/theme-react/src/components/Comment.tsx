import * as React from 'react';

export interface CommentProps {
  title: string;
  disqus?: {
    identifier: string;
    url: string;
    shortname: string;
  };
}

const EMPTY_DISQUS_CONFIG = {
  identifier: '',
  url: '',
  shortname: ''
};

export const Comment = (props) => {
  const disqusConfig = props.disqus || EMPTY_DISQUS_CONFIG;

  return <React.Fragment />;
};
