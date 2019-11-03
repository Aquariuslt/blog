import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { BreadcrumbList } from '@blog/common/interfaces/routes/breadcrumb';
import { CARD_MAX_WIDTH } from '@theme-react/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: CARD_MAX_WIDTH
    },
    paper: {
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    }
  })
);

export const BreadcrumbItems: React.FC<BreadcrumbList> = (props) => {
  const classes = useStyles();
  const breadcrumbItems = props.itemListElement || [];

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <Link key={index} color="inherit" href={item.item}>
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Paper>
    </div>
  );
};
