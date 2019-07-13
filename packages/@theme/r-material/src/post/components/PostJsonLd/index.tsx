// Wrap google's react-schemaorg with target es5

import { Article, Thing, WithContext } from 'schema-dts';
import * as React from 'react';

interface JsonLdItemProps<T extends Thing> {
  item: WithContext<T>;
}

const PostJsonLd: React.ComponentType<JsonLdItemProps<Article>> = (props: JsonLdItemProps<Article>) => {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.item) }} />;
};

export default PostJsonLd;
