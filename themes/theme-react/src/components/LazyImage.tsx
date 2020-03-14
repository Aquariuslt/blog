import * as React from 'react';
import clsx from 'clsx';
import LazyLoad from 'vanilla-lazyload';
import placeholder from '@theme-react/imgs/placeholder.png';

export interface LazyImageProps {
  image?: string;
  alt?: string;
  lazy?: boolean;
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

  const shouldLazy = props.lazy || true;

  return (
    <picture>
      <source data-srcset={webpImage} type="image/webp" data-was-processed={false} />
      <img
        alt={props.alt}
        className={clsx(props.className, 'lazy')}
        src={shouldLazy ? placeholder : props.image}
        data-src={props.image}
      />
    </picture>
  );
};
