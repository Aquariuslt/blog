import * as React from 'react';
import clsx from 'clsx';
import LazyLoad from 'vanilla-lazyload';
import placeholder from '@theme-react/imgs/placeholder.png';
import { useEffect } from 'react';

export interface LazyImageProps {
  image?: string;
  alt?: string;
  lazy?: boolean;
  [key: string]: any;
}

const PNG_EXTENSION = '.png';
const WEBP_EXTENSION = '.webp';

export const LazyImage: React.FC<LazyImageProps> = (props) => {
  useEffect(() => {
    const lazyLoadInstance = new LazyLoad({
      elements_selector: '.lazy'
    });

    lazyLoadInstance.update();
  }, [props.image]);

  const webpImage = props.image ? props.image.replace(PNG_EXTENSION, WEBP_EXTENSION) : '';

  const shouldLazy = props.lazy !== false;

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
