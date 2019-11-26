import clsx from 'clsx';
import LazyLoad from 'vanilla-lazyload';
import * as React from 'react';
import { useEffect } from 'react';

const placeholder = require('@theme-react/imgs/placeholder.png');

export interface LazyImageProps {
  image?: string;
  alt?: string;
  [key: string]: any;
}

export const LazyImage: React.FC<LazyImageProps> = (props) => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  });

  lazyLoadInstance.update();

  const webpImage = props.image ? props.image.replace('.png', '.webp') : '';

  return (
    <picture>
      <source data-srcset={webpImage} type="image/webp" />
      <img alt={props.alt} className={clsx(props.className, 'lazy')} src={placeholder} data-src={props.image} />
    </picture>
  );
};
