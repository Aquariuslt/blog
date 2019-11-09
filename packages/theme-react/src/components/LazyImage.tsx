import lozad from 'lozad';
import * as React from 'react';
import { useCallback } from 'react';

const placeholder = require('@theme-react/imgs/placeholder.png');

export interface LazyImageProps {
  image?: string;
  alt?: string;
  [key: string]: any;
}

export const LazyImage: React.FC<LazyImageProps> = (props) => {
  const imageElement = useCallback(
    (node) => {
      if (node != null) {
        node.removeAttribute('data-loaded');
        const observer = lozad(node);
        observer.observe();
      }
    },
    [props.image]
  );

  return <img ref={imageElement} src={placeholder} data-src={props.image} alt={props.alt} {...props} />;
};
