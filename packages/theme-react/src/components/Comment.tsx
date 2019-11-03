import * as React from 'react';
import Disqus from 'disqus-react';

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

export const Comment: React.FC<CommentProps> = (props) => {
  const disqusConfig = props.disqus || EMPTY_DISQUS_CONFIG;

  return (
    <Disqus.DiscussionEmbed
      shortname={disqusConfig.shortname}
      config={{
        url: disqusConfig.url,
        identifier: disqusConfig.identifier,
        title: props.title
      }}
    />
  );
};
