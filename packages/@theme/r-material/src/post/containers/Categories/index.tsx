import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { CategoryStore } from '../../stores/category.store';
import { PropsWithRoute } from '@theme/r-material/src/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from '../../../styles';
import { Link } from 'react-router-dom';

type CategoriesProps = {} & {
  categoryStore: CategoryStore;
};

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(1)
      },
      table: {
        maxWidth: styles.content.maxWidth
      },
      row: {
        '&:hover': {
          cursor: 'pointer'
        },
        padding: 0
      },
      link: {
        textDecoration: 'none',
        width: '100%',
        height: '100%'
      }
    })
);

const Categories = inject('categoryStore')(
  observer((props: PropsWithRoute<CategoriesProps>) => {
    const classes = useStyles();
    const categories = props.categoryStore.categories;
    const [t] = useTranslation();

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('post.navigation.category.label')}</TableCell>
              <TableCell align="right">{t('post.navigation.total.label')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow key={row.name} className={classes.row} hover>
                <TableCell component="th" scope="row">
                  <Link to={row.link} className={classes.link}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  })
);

export default Categories;
