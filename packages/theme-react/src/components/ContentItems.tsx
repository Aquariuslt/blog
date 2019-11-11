import * as React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { ContentItem } from '@blog/common/interfaces/articles/content-item';
import { DRAWER_WIDTH } from '@theme-react/constants';
import SmoothScroll from 'smooth-scroll';
import Typography from '@material-ui/core/Typography';

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
      }
    }
  })
);

export interface ContentItemsProps {
  items: ContentItem[];
}

export const ContentItems: React.FC<ContentItemsProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  const scrollTo = (id: string) => () => {
    const scroll = new SmoothScroll();
    scroll.animateScroll(document.getElementById(id));
  };

  const ContentLink: React.FC<ContentItem> = (item) => {
    return (
      <React.Fragment>
        <Typography
          onClick={scrollTo(item.id)}
          component="li"
          className={classes.item}
          style={{
            paddingLeft: theme.spacing(item.level)
          }}
        >
          {item.label}
        </Typography>

        {item.children.length > 0 && (
          <Typography component="ul" className={classes.ul}>
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
      {props.items.map(
        (item): JSX.Element => (
          <ContentLink key={item.id} {...item} />
        )
      )}
    </nav>
  );
};
