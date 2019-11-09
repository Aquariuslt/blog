import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { CARD_MAX_WIDTH } from '@theme-react/constants';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { LazyImage } from '@theme-react/components/LazyImage';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
      maxWidth: CARD_MAX_WIDTH,
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0, 0, 0)
      }
    },
    media: {
      width: '100%',
      maxWidth: '100%'
    }
  })
);

export const ArticleCard: React.FC<Partial<ArticleContext>> = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={String(props['link'])}>
        <LazyImage className={classes.media} image={props.cover} alt={props.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
