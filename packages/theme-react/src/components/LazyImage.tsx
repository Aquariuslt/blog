import lozad from 'lozad';
import * as React from 'react';
import { useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export interface LazyImageProps {
  image?: string;
  alt?: string;
  [key: string]: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    '@keyframes slide': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    skeleton: {
      animationName: '$slide',
      animationDuration: '1.5s',
      animationTimingFunction: 'ease-in-ease-out',
      animationIterationCount: 'infinite',
      animationPlayState: 'running'
    }
  })
);

export const LazyImage: React.FC<LazyImageProps> = (props) => {
  const classes = useStyles();

  const imageElement = useCallback(
    (node) => {
      if (node != null && props.image) {
        node.removeAttribute('data-loaded');

        // lozad <picture/> implementation sucks...
        const observer = lozad(node, {
          loaded: (el) => {
            el.classList.remove(classes.skeleton);
            el.lastChild.classList.remove(classes.skeleton);
            el.lastChild.classList.add(props.className);
          }
        });
        observer.observe();
      }
    },
    [props.image]
  );

  const webpUrl = props.image ? props.image.replace('.png', '.webp') : props.image;

  return (
    <picture ref={imageElement} className={`${props.className} ${classes.skeleton}`}>
      <source
        {...props}
        srcSet={webpUrl}
        data-alt={props.alt}
        data-srcset={webpUrl}
        className={`${props.className} ${classes.skeleton}`}
        type="image/webp"
      />
      <source
        {...props}
        srcSet={props.image}
        data-alt={props.alt}
        data-srcset={props.image}
        className={`${props.className} ${classes.skeleton}`}
      />
    </picture>
  );
};
