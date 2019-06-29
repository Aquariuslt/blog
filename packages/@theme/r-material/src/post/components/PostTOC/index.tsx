import * as React from 'react';

import { makeStyles, StyleRules, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../../../styles';

const useStyles = makeStyles((theme: Theme): StyleRules => ({
    root: {
      width: styles.sidebar.width,
      flexShrink: 0,
      order: 2,
      position: 'sticky',
      overflowX: 'hidden',
      overflowY: 'auto',
      overflowWrap: 'break-word',
      padding: theme.spacing(2, 2, 2, 0),
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
        borderLeft: `4px solid ${theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]}`,
        cursor: 'pointer'
      },
      '&$active,&:active': {
        borderLeft: `4px solid ${theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]}`
      }
    }
  })
);

interface PostTOCProps {
  contents: BlogModel.ContentItem[] | undefined;
}


const PostTOC: React.ComponentType<PostTOCProps> = (props: PostTOCProps): JSX.Element => {

  const theme = useTheme();
  const classes = useStyles();


  const ContentLink = (item: BlogModel.ContentItem): JSX.Element => {
    return (
      <React.Fragment>
        <Typography
          component="li"
          className={classes.item}
          style={{
            paddingLeft: theme.spacing((item.level))
          }}
        >
          {item.label}
        </Typography>
        <Typography component="ul" className={classes.ul}>
          {
            item.children.length > 0 &&
            item.children.map((child): JSX.Element => (
              <ContentLink key={child.id}{...child} />
            ))
          }
        </Typography>
      </React.Fragment>
    );
  };

  return (
    <nav className={classes.root}>
      {
        props.contents &&
        props.contents.map((item): JSX.Element => (
          <ContentLink key={item.id} {...item}/>
        ))
      }
    </nav>
  );
};


export default PostTOC;
