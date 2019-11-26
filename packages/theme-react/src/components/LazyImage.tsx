import lozad from 'lozad';
import * as React from 'react';
import { useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const placeholder = require('@theme-react/imgs/placeholder.png');

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
      if (node != null) {
        node.removeAttribute('data-loaded');
        const observer = lozad(node, {
          loaded: (el) => {
            el.classList.remove(classes.skeleton);
          }
        });
        observer.observe();
      }
    },
    [props.image]
  );

  return (
    <img
      {...props}
      ref={imageElement}
      src={placeholder}
      data-src={props.image}
      alt={props.alt}
      className={`${props.className} ${classes.skeleton}`}
    />
  );
};
