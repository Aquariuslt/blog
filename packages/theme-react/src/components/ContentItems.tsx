import * as React from 'react';
import clsx from 'clsx';
import throttle from 'lodash/throttle';
import noop from 'lodash/noop';
import SmoothScroll from 'smooth-scroll';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { ContentItem } from '@blog/common/interfaces/articles/content-item';
import { DRAWER_WIDTH } from '@theme-react/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      order: 2,
      position: 'fixed',
      overflowX: 'hidden',
      overflowY: 'auto',
      overflowWrap: 'break-word',
      padding: theme.spacing(1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      },
      listStyleType: 'none'
    },
    contents: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(1.5)
    },
    ul: {
      padding: 0,
      margin: 0,
      listStyleType: 'none'
    },
    item: {
      fontSize: 13,
      padding: theme.spacing(0.5, 0, 0.5, 1),
      borderLeft: '4px solid transparent',
      boxSizing: 'content-box',
      '&:hover': {
        borderLeft: `4px solid ${theme.palette.grey[200]}`,
        cursor: 'pointer'
      },
      '&$active,&:active': {
        borderLeft: `4px solid ${theme.palette.grey[200]}`
      }
    },
    active: {}
  })
);

export interface ContentItemsProps {
  items: ContentItem[];
}

const useThrottledOnScroll = (callback, delay) => {
  const throttledCallback = React.useMemo(() => (callback ? throttle(callback, delay) : noop), [callback, delay]);

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

export const ContentItems: React.FC<ContentItemsProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [activeState, setActiveState] = React.useState<string | null>(null);

  const scrollTo = (id: string) => () => {
    const SCROLL_DURATION = 2000;
    const scroll = new SmoothScroll();
    scroll.animateScroll(document.getElementById(id), {
      speed: SCROLL_DURATION,
      speedAsDuration: true
    });

    setTimeout(() => {
      if (activeState !== id) {
        setActiveState(id);
      }
    }, SCROLL_DURATION + 500);
  };

  const collectAllIds = (rootItem: ContentItem) => {
    const collectItemIds = (item) => {
      if (item.children) {
        let ids = [item.id];
        item.children.forEach((child) => {
          ids = ids.concat(collectItemIds(child));
        });
        return ids;
      } else {
        return [item.id];
      }
    };

    return collectItemIds(rootItem);
  };

  const findActiveIndex = React.useCallback(() => {
    const ids = collectAllIds(props.items && props.items[0]);

    let activeNode;

    for (let i = ids.length - 1; i >= 0; i--) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        break;
      }

      const checkingNode = document.getElementById(ids[i]);
      if (
        checkingNode &&
        checkingNode.offsetTop < document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        activeNode = checkingNode;
        break;
      }
    }

    if (activeNode && activeState !== activeNode.id) {
      setActiveState(activeNode.id);
    } else {
      ids.length > 0 && setActiveState(ids[0]);
    }
  }, [props]);

  useThrottledOnScroll(props.items ? findActiveIndex : null, 166);

  const ContentLink: React.FC<ContentItem> = (item) => {
    return (
      <React.Fragment>
        <Typography
          onClick={scrollTo(item.id)}
          component="li"
          className={clsx(classes.item, activeState === item.id ? classes.active : undefined)}
          style={{
            paddingLeft: theme.spacing(item.level)
          }}
        >
          {item.label}
        </Typography>

        {item.children.length > 0 && (
          <Typography component="ol" className={classes.ul}>
            {item.children.map((child) => (
              <ContentLink key={child.id} {...child} />
            ))}
          </Typography>
        )}
      </React.Fragment>
    );
  };

  return (
    <nav className={classes.root}>
      {props.items.map((item) => (
        <ContentLink key={item.id} {...item} />
      ))}
    </nav>
  );
};
