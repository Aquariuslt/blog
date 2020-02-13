import * as React from 'react';
import clsx from 'clsx';
import LazyLoad from 'vanilla-lazyload';
import placeholder from '@theme-react/imgs/placeholder.png';

export interface LazyImageProps {
  image?: string;
  alt?: string;

  [key: string]: any;
}

const PNG_EXTENSION = '.png';
const WEBP_EXTENSION = '.webp';

export const LazyImage: React.FC<LazyImageProps> = (props) => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  });

  lazyLoadInstance.update();
  const webpImage = props.image ? props.image.replace(PNG_EXTENSION, WEBP_EXTENSION) : '';

  return (
    <picture>
      <source data-srcset={webpImage} type="image/webp" data-was-processed={false} />
      <img alt={props.alt} className={clsx(props.className, 'lazy')} src={placeholder} data-src={props.image} />
    </picture>
  );
};
